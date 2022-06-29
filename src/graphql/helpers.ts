import { builder } from "./builder";

export function paginateArgs() {
  return builder.args((t) => ({
    limit: t.int(),
    offset: t.int(),
  }));
}

export function paginateQuery(args: {
  limit?: number | null;
  offset?: number | null;
}) {
  return {
    take: args.limit ?? 20,
    skip: args.offset ?? 0,
  };
}
