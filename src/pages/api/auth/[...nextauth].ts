import NextAuth from "next-auth";
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
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60, // 5 minutes
  },
  jwt: {
    // maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token, user }) {
      return { ...session, user: { ...session.user, id: token.sub } };
    },
  },
});
