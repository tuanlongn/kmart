import { z, ZodError } from "zod";
import { OrderRef } from "./../types";
import { builder } from "./../builder";
import { CartItemStatus, Order, OrderStatus } from "@prisma/client";
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
      });
    },
  });
});

builder.queryField("myOrder", (t) => {
  return t.prismaField({
    type: OrderRef,
    authScopes: {
      logged: true,
    },
    args: {
      id: t.arg.string({
        required: true,
      }),
    },
    resolve: async (query, root, args, ctx, info): Promise<Order> => {
      return prisma.order.findUnique({
        ...query,
        where: {
          id_userId: {
            id: args.id,
            userId: ctx.userId,
          },
        },
        rejectOnNotFound: true,
      });
    },
  });
});

builder.queryField("order", (t) => {
  return t.prismaField({
    type: OrderRef,
    authScopes: {
      isAdmin: true,
    },
    args: {
      id: t.arg.string({
        required: true,
      }),
    },
    resolve: async (query, root, args, ctx, info): Promise<Order> => {
      return prisma.order.findUnique({
        ...query,
        where: { id: args.id },
        rejectOnNotFound: true,
      });
    },
  });
});

builder.queryField("orders", (t) => {
  return t.prismaField({
    type: [OrderRef],
    authScopes: {
      isAdmin: true,
    },
    args: {
      ...paginateArgs(),
    },
    resolve: async (query, root, args, ctx, info): Promise<Order[]> => {
      return prisma.order.findMany({
        ...query,
        ...paginateQuery(args),
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
