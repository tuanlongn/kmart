import { builder } from "./builder";
import prisma from "../db/prisma";
import {
  CartItem,
  CartItemStatus,
  Category,
  Product,
  User,
} from "@prisma/client";

const UserRef = builder.prismaObject("User", {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    orders: t.relation("orders"),
  }),
});

const ProductRef = builder.prismaObject("Product", {
  findUnique: (product) => ({ id: product.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.string({
      nullable: true,
      resolve: (product) => product.description,
    }),
    labelPrice: t.float({
      nullable: true,
      resolve: (product) => product.labelPrice,
    }),
    variants: t.relation("variants"),
  }),
});

builder.prismaObject("ProductVariant", {
  findUnique: (variant) => ({ id: variant.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.string({
      nullable: true,
      resolve: (variant) => variant.title,
    }),
    price: t.exposeFloat("price"),
    image: t.relation("image"),
    product: t.relation("product"),
  }),
});

builder.prismaObject("ProductImage", {
  findUnique: (image) => ({ id: image.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    source: t.exposeString("source"),
    position: t.exposeInt("position"),
  }),
});

const CategoryRef = builder.prismaObject("Category", {
  findUnique: (category) => ({ id: category.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.string({
      nullable: true,
      resolve: (category) => category.description,
    }),
    products: t.field({
      args: { ...paginateArgs() },
      select: (args, ctx, nestedSelection) => ({
        categoriesOnProducts: {
          select: {
            product: nestedSelection(true),
          },
          ...paginateQuery(args),
        },
      }),
      type: [ProductRef],
      resolve: (category) => {
        return category.categoriesOnProducts.map((item) => item.product);
      },
    }),
  }),
});

const CartItemRef = builder.prismaObject("CartItem", {
  findUnique: (item) => ({ id: item.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    productVariant: t.relation("productVariant"),
  }),
});

builder.prismaObject("Order", {
  findUnique: (order) => ({ id: order.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    status: t.field({
      type: "String",
      resolve: (order) => order.status,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    // me: t.prismaField({
    //   type: "User",
    //   authScopes: {
    //     logged: true,
    //   },
    //   resolve: async (query, root, args, ctx, info): Promise<User> => {
    //     return prisma.user.findUnique({
    //       ...query,
    //       rejectOnNotFound: true,
    //       where: { id: ctx.userId },
    //     });
    //   },
    // }),
    user: t.prismaField({
      type: UserRef,
      args: {
        id: t.arg.string({
          required: true,
          description: "userId",
        }),
      },
      authScopes: {
        logged: true,
      },
      resolve: async (query, root, args, ctx, info): Promise<User> => {
        return prisma.user.findUnique({
          ...query,
          rejectOnNotFound: true,
          where: { id: args.id },
        });
      },
    }),
    users: t.prismaField({
      type: [UserRef],
      resolve: async (query, root, args, ctx, info): Promise<User[]> => {
        return prisma.user.findMany({
          ...query,
        });
      },
    }),
    products: t.prismaField({
      type: [ProductRef],
      args: paginateArgs(),
      resolve: async (query, root, args, ctx, info): Promise<Product[]> => {
        return prisma.product.findMany({
          ...query,
          ...paginateQuery(args),
        });
      },
    }),
    category: t.prismaField({
      type: CategoryRef,
      args: {
        id: t.arg.string({
          required: true,
          description: "categoryId",
        }),
      },
      resolve: async (query, root, args, ctx, info): Promise<Category> => {
        return prisma.category.findUnique({
          ...query,
          rejectOnNotFound: true,
          where: { id: args.id },
        });
      },
    }),
    categories: t.prismaField({
      type: [CategoryRef],
      args: {
        ...paginateArgs(),
      },
      resolve: async (query, root, args, ctx, info): Promise<Category[]> => {
        return prisma.category.findMany({
          ...query,
          ...paginateQuery(args),
        });
      },
    }),
    myCart: t.prismaField({
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
    }),
  }),
});

builder.mutationType({});

builder.mutationField("addCartItem", (t) => {
  return t.prismaField({
    type: CartItemRef,
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

function paginateArgs() {
  return builder.args((t) => ({
    limit: t.int(),
    offset: t.int(),
  }));
}

function paginateQuery(args: {
  limit?: number | null;
  offset?: number | null;
}) {
  return {
    take: args.limit ?? 20,
    skip: args.offset ?? 0,
  };
}

const schema = builder.toSchema({});

export default schema;
