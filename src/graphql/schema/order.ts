import { z, ZodError } from "zod";
import { OrderRef } from "./../types";
import { builder } from "./../builder";
import {
  CartItemStatus,
  Order,
  OrderStatus,
  PrismaClient,
} from "@prisma/client";
import prisma from "../../db/prisma";
import { paginateArgs, paginateQuery } from "../helpers";

builder.queryField("myOrders", (t) => {
  return t.prismaField({
    type: [OrderRef],
    authScopes: {
      logged: true,
    },
    args: {
      ...paginateArgs(),
    },
    resolve: async (query, root, args, ctx, info): Promise<Order[]> => {
      return prisma.order.findMany({
        ...query,
        ...paginateQuery(args),
        where: { userId: ctx.userId },
      });
    },
  });
});

builder.mutationField("createMyOrder", (t) => {
  return t.prismaField({
    type: OrderRef,
    errors: {
      types: [ZodError, Error],
    },
    authScopes: {
      logged: true,
    },
    args: {
      cartItemIDs: t.arg.stringList({
        required: true,
      }),
      status: t.arg.string({
        required: true,
        validate: {
          schema: z.nativeEnum(OrderStatus),
        },
      }),
    },
    resolve: async (query, root, args, ctx, info): Promise<Order> => {
      const cartItemCount = await prisma.cartItem.count({
        where: {
          userId: ctx.userId,
          id: {
            in: args.cartItemIDs,
          },
          status: CartItemStatus.HOLD,
        },
      });

      if (cartItemCount !== args.cartItemIDs.length) {
        throw new Error("cartItemIDs invalid");
      }

      const newOrder = await prisma.$transaction(async (prismaTransaction) => {
        const order = await prismaTransaction.order.create({
          data: {
            user: {
              connect: {
                id: ctx.userId,
              },
            },
            status: args.status as OrderStatus,
          },
        });

        await Promise.all(
          args.cartItemIDs.map((cartItemId) => {
            return prismaTransaction.cartItem.update({
              data: {
                order: {
                  connect: {
                    id: order.id,
                  },
                },
                status: CartItemStatus.PAID,
              },
              where: {
                id: cartItemId,
              },
            });
          })
        );

        return order;
      });

      return prisma.order.findUnique({
        ...query,
        where: {
          id: newOrder.id,
        },
        rejectOnNotFound: true,
      });
    },
  });
});
