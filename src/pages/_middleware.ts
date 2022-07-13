import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const baseUrl = process.env.NEXTAUTH_URL;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    console.log(session);
    if (!session || !session.isAdmin) {
      return NextResponse.redirect(
        `${baseUrl}/api/auth/signin?callbackUrl=${encodeURIComponent(req.url)}`
      );
    }
  }

  if (
    req.nextUrl.pathname.startsWith("/cart") ||
    req.nextUrl.pathname.startsWith("/payment") ||
    req.nextUrl.pathname.startsWith("/order")
  ) {
    if (!session) {
      return NextResponse.redirect(
        `${baseUrl}/api/auth/signin?callbackUrl=${encodeURIComponent(req.url)}`
      );
    }
  }

  return NextResponse.next();
}
