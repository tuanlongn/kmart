import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import TracingPlugin, {
  wrapResolver,
  isRootField,
} from "@pothos/plugin-tracing";
import PrismaPlugin from "@pothos/plugin-prisma";
import ErrorsPlugin from "@pothos/plugin-errors";
import ValidationPlugin from "@pothos/plugin-validation";
import WithInputPlugin from "@pothos/plugin-with-input";
import { Prisma } from "@prisma/client";
import PrismaTypes from "../db/prisma/__generated__/pothos-types";
import prisma from "../db/prisma";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  Context: { userId: string; isAdmin: boolean };
  AuthScopes: {
    logged: boolean;
    isAdmin: boolean;
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [
    ScopeAuthPlugin,
    PrismaPlugin,
    WithInputPlugin,
    TracingPlugin,
    ErrorsPlugin,
    ValidationPlugin,
  ],
  authScopes: async (context) => {
    return {
      logged: !!context.userId,
      isAdmin: context.isAdmin,
    };
  },

  //----------------
  // ScopeAuthPlugin
  scopeAuthOptions: {
    // Affects all object types (Excluding Query, Mutation, and Subscription)
    runScopesOnType: true,
  },
  //----------------
  // PrismaPlugin
  prisma: {
    client: (ctx) => prisma,
    // Because the prisma client is loaded dynamically, we need to explicitly provide the some information about the prisma schema
    dmmf: (prisma as unknown as { _dmmf: Prisma.DMMF.Document })._dmmf,
  },
  //----------------
  // WithInputPlugin
  withInput: {
    typeOptions: {
      // default options for Input object types created by this plugin
    },
    argOptions: {
      // set required: false to override default behavior
    },
  },
  //--------------
  // TracingPlugin
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
  //-------------
  // ErrorsPlugin
  errorOptions: {
    defaultTypes: [],
  },
});
