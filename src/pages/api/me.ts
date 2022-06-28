import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

type Data = {
  me?: any;
  token?: string;
  error?: string;
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [token, session] = await Promise.all([
    getToken({ req, secret, raw: true }),
    getSession({ req }),
  ]);
  if (!token || !session) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    res.status(200).json({ me: session.user, token: token });
  }
}
