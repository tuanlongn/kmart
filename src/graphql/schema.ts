import { builder } from "./builder";
import prisma from "../db/prisma";
import { Product, User } from "@prisma/client";

builder.prismaObject("User", {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    orders: t.relation("orders"),
  }),
});

builder.prismaObject("Product", {
  findUnique: (product) => ({ id: product.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.exposeString("description"),
    labelPrice: t.float({
      nullable: true,
      resolve: (product) => product.labelPrice,
    }),
    variants: t.relation("variants"),
    images: t.relation("images"),
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
    imageId: t.string({
      nullable: true,
      resolve: (variant) => variant.imageId,
    }),
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

builder.prismaObject("CartItem", {
  findUnique: (item) => ({ id: item.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    product: t.relation("product"),
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
    me: t.prismaField({
      type: "User",
      authScopes: {
        logged: true,
      },
      resolve: async (query, root, args, ctx, info): Promise<User> => {
        return prisma.user.findUnique({
          ...query,
          rejectOnNotFound: true,
          where: { id: ctx.userId },
        });
      },
    }),
    user: t.prismaField({
      type: "User",
      args: {
        id: t.arg({
          type: "String",
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
      type: ["User"],
      resolve: async (query, root, args, ctx, info): Promise<User[]> => {
        return prisma.user.findMany({
          ...query,
        });
      },
    }),
    products: t.prismaField({
      type: ["Product"],
      args: paginateArgs(),
      resolve: async (query, root, args, ctx, info): Promise<Product[]> => {
        return prisma.product.findMany({
          ...query,
          ...paginateQuery(args),
        });
      },
    }),
  }),
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
