import { logger } from "./../common/logger";
import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "stdout",
        level: "error",
      },
      {
        emit: "stdout",
        level: "info",
      },
      {
        emit: "stdout",
        level: "warn",
      },
    ],
  });

// @ts-expect-error
prisma.$on("query", (e: any) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

// prisma.$use(async (params, next) => {
//   const before = Date.now();
//   const result = await next(params);
//   const after = Date.now();
//   console.log(params);
//   // console.log(
//   //   `Query ${params.model}.${params.action} took ${after - before}ms`
//   // );
//   return result;
// });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
