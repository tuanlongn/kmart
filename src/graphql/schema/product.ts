import { Category, Product } from "@prisma/client";
import { builder } from "../builder";
import prisma from "../../db/prisma";
import { paginateArgs, paginateQuery } from "../helpers";
import { CategoryRef, ProductRef } from "../types";

builder.queryField("products", (t) =>
  t.prismaField({
    type: [ProductRef],
    args: paginateArgs(),
    resolve: async (query, root, args, ctx, info): Promise<Product[]> => {
      return prisma.product.findMany({
        ...query,
        ...paginateQuery(args),
      });
    },
  })
);

builder.queryField("category", (t) =>
  t.prismaField({
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
  })
);

builder.queryField("categories", (t) =>
  t.prismaField({
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
  })
);
