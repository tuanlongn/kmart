import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import TracingPlugin, {
  wrapResolver,
  isRootField,
} from "@pothos/plugin-tracing";
import PrismaPlugin from "@pothos/plugin-prisma";
import ErrorsPlugin from "@pothos/plugin-errors";
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
  plugins: [ScopeAuthPlugin, PrismaPlugin, TracingPlugin, ErrorsPlugin],
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
  tracing: {
    // Enable tracing for rootFields by default, other fields need to opt in
    default: (config) => isRootField(config),
    // Log resolver execution duration
    wrap: (resolver, options, config) =>
      wrapResolver(resolver, (error, duration) => {
        console.log(
          `Executed resolver ${config.parentType}.${config.name} in ${duration}ms`
        );
      }),
  },
  errorOptions: {
    defaultTypes: [],
  },
});
