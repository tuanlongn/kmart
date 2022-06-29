import { builder } from "./../builder";
import { UserRef } from "../types";
import { User } from "@prisma/client";
import prisma from "../../db/prisma";

builder.queryField("me", (t) =>
  t.prismaField({
    type: UserRef,
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
  })
);

builder.queryField("user", (t) =>
  t.prismaField({
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
  })
);

builder.queryField("users", (t) =>
  t.prismaField({
    type: [UserRef],
    resolve: async (query, root, args, ctx, info): Promise<User[]> => {
      return prisma.user.findMany({
        ...query,
      });
    },
  })
);
