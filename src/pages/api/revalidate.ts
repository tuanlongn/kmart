import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

type Data = {
  revalidated: boolean;
  message?: string;
};

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req, secret });
  console.log(token);

  try {
    await res.revalidate("/");
    res.status(200).json({ revalidated: true });
  } catch (e) {
    res.status(500).send({ revalidated: false, message: "Error revalidating" });
  }
}
