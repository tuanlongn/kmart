import { CartItem, CartItemStatus } from "@prisma/client";
import { builder } from "../builder";
import prisma from "../../db/prisma";
import { CartItemRef } from "../types";
import { ZodError } from "zod";

builder.queryField("myCart", (t) =>
  t.prismaField({
    type: [CartItemRef],
    authScopes: {
      logged: true,
    },
    resolve: async (query, root, args, ctx, info): Promise<CartItem[]> => {
      return prisma.cartItem.findMany({
        ...query,
        where: { userId: ctx.userId, status: CartItemStatus.HOLD },
      });
    },
  })
);

builder.mutationField("addCartItem", (t) => {
  return t.prismaField({
    type: CartItemRef,
    errors: {
      types: [ZodError, Error],
    },
    args: {
      variantId: t.arg.string({
        required: true,
        description: "ProductVariantId",
      }),
      quantity: t.arg.int({
        required: true,
        description: "Quantity",
      }),
    },
    authScopes: {
      logged: true,
    },
    resolve: async (query, root, args, ctx, info): Promise<CartItem> => {
      const inventoryCount = await prisma.inventoryItem.count({
        where: {
          productVariantId: args.variantId,
        },
      });

      const existCartItem = await prisma.cartItem.findFirst({
        where: {
          userId: ctx.userId,
          productVariantId: args.variantId,
          status: CartItemStatus.HOLD,
        },
      });

      if (existCartItem) {
        if (inventoryCount < existCartItem.quantity + args.quantity) {
          throw new Error("Not enough quantity in inventory");
        }
      } else {
        if (inventoryCount < args.quantity) {
          throw new Error("Not enough quantity in inventory");
        }
      }

      try {
        let cartItem: CartItem;
        if (existCartItem) {
          cartItem = await prisma.cartItem.update({
            where: {
              id: existCartItem.id,
            },
            data: {
              quantity: existCartItem.quantity + args.quantity,
            },
          });
        } else {
          cartItem = await prisma.cartItem.create({
            data: {
              user: {
                connect: {
                  id: ctx.userId,
                },
              },
              productVariant: {
                connect: {
                  id: args.variantId,
                },
              },
              quantity: args.quantity,
              status: CartItemStatus.HOLD,
              addAt: new Date(),
            },
          });
        }
        return cartItem;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  });
});

builder.mutationField("updateCartItem", (t) => {
  return t.prismaField({
    type: CartItemRef,
    errors: {
      types: [ZodError, Error],
    },
    args: {
      id: t.arg.string({
        required: true,
        description: "CartItemId",
      }),
      quantity: t.arg.int({
        required: true,
        validate: {
          min: [1, { message: "should be at least 1" }],
        },
        description: "Quantity",
      }),
    },
    authScopes: {
      logged: true,
    },
    resolve: async (query, root, args, ctx, info): Promise<CartItem> => {
      const existCartItem = await prisma.cartItem.findFirst({
        where: {
          id: args.id,
        },
        rejectOnNotFound: true,
      });

      const inventoryCount = await prisma.inventoryItem.count({
        where: {
          productVariantId: existCartItem.productVariantId,
        },
      });

      if (inventoryCount < args.quantity) {
        throw new Error("Not enough quantity in inventory");
      }

      try {
        const cartItem = await prisma.cartItem.update({
          where: {
            id: existCartItem.id,
          },
          data: {
            quantity: args.quantity,
          },
        });
        return cartItem;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  });
});

builder.mutationField("removeCartItem", (t) => {
  return t.field({
    type: CartItemRef,
    errors: {
      types: [ZodError, Error],
    },
    args: {
      id: t.arg.string({
        required: true,
        description: "cartItemId",
      }),
    },
    authScopes: {
      logged: true,
    },
    resolve: async (root, args, ctx) => {
      try {
        const result = await prisma.cartItem.delete({
          where: {
            id: args.id,
          },
        });
        return result;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  });
});
