import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt/types";
import AzureADProvider from "next-auth/providers/azure-ad";
import PrismaAdapter from "../../../common/next-auth-prisma-adapter";
import prisma from "../../../db/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60, // 5 minutes
  },
  jwt: {
    // maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
  },
});
