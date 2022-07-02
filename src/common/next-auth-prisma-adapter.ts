import { PrismaClient } from "@prisma/client";
import { Account } from "next-auth";
import type { Adapter, AdapterSession, AdapterUser } from "next-auth/adapters";

export default function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user: Omit<AdapterUser, "id">): Promise<AdapterUser> {
      const newUser = await prisma.user.create({
        data: {
          name: user.name as string,
          email: user.email as string,
          phone: user.phone as string,
          image: user.image as string,
        },
      });
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        emailVerified: newUser.createdAt,
        isAdmin: user.isAdmin,
      };
    },
    async getUser(id: string): Promise<AdapterUser | null> {
      const user = await prisma.user.findUnique({ where: { id } });
      return user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.createdAt,
            isAdmin: user.isAdmin,
          }
        : null;
    },
    async getUserByEmail(email: string): Promise<AdapterUser | null> {
      const user = await prisma.user.findUnique({ where: { email } });
      return user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.createdAt,
            isAdmin: user.isAdmin,
          }
        : null;
    },
    async getUserByAccount({
      provider,
      providerAccountId,
    }): Promise<AdapterUser | null> {
      const auth = await prisma.authProvider.findUnique({
        where: {
          provider_providerAccountId: {
            provider,
            providerAccountId,
          },
        },
        select: { user: true },
      });
      return auth?.user
        ? {
            id: auth.user.id,
            name: auth.user.name,
            email: auth.user.email,
            image: auth.user.image,
            emailVerified: auth.user.createdAt,
            isAdmin: auth.user.isAdmin,
          }
        : null;
    },
    async updateUser(
      user: Omit<Partial<AdapterUser>, "emailVerified">
    ): Promise<AdapterUser> {
      const updatedUser = await prisma.user.update({
        where: { id: user.id as string },
        data: { ...user },
      });
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        emailVerified: updatedUser.createdAt,
      };
    },
    async linkAccount(account: Account): Promise<void> {
      await prisma.authProvider.create({
        data: {
          userId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refreshToken: account.refresh_token ?? null,
          accessToken: account.access_token ?? null,
          expiresAt: account.expires_at ?? null,
          tokenType: account.token_type ?? null,
          scope: account.scope ?? null,
          idToken: account.id_token ?? null,
          sessionState: account.session_state ?? null,
        },
      });
    },
    async createSession({
      sessionToken,
      userId,
      expires,
    }): Promise<AdapterSession> {
      return {
        id: userId,
        sessionToken,
        userId,
        expires,
      };
    },
    async getSessionAndUser(
      sessionToken
    ): Promise<{ session: AdapterSession; user: AdapterUser } | null> {
      return null;
    },
    async updateSession({
      sessionToken,
    }): Promise<AdapterSession | null | undefined> {
      return;
    },
    async deleteSession(sessionToken) {
      return;
    },
  };
}
