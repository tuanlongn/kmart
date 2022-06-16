import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import PrismaPlugin from "@pothos/plugin-prisma";
import { Prisma } from "@prisma/client";
import PrismaTypes from "../db/prisma/__generated__/pothos-types";
import prisma from "../db/prisma";

export const builder = new SchemaBuilder<{
  Context: { user: any; userId: string };
  AuthScopes: {
    logged: boolean;
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin],
  authScopes: async (context) => {
    return {
      logged: !!context.userId,
    };
  },
  scopeAuthOptions: {
    // Affects all object types (Excluding Query, Mutation, and Subscription)
    runScopesOnType: true,
  },
  prisma: {
    client: (ctx) => prisma,
    // Because the prisma client is loaded dynamically, we need to explicitly provide the some information about the prisma schema
    dmmf: (prisma as unknown as { _dmmf: Prisma.DMMF.Document })._dmmf,
  },
});
