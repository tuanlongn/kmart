import { createServer } from "@graphql-yoga/node";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import schema from "../../graphql/schema";

const secret = process.env.NEXTAUTH_SECRET;

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: schema,
  context: async ({ req }) => {
    const token = await getToken({ req, secret });
    return { userId: token?.sub, isAdmin: token?.isAdmin };
  },
});

export default server;
