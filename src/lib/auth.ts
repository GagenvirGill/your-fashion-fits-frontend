import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			if (!account || account.provider !== "google") return false;

			try {
				const res = await fetch(
					`${process.env.BACKEND_URL}/user/sync`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"X-API-Key": process.env.BACKEND_API_KEY!,
							"X-User-Id": "system",
						},
						body: JSON.stringify({
							provider: "google",
							providerId: account.providerAccountId,
							email: user.email,
						}),
					}
				);

				if (!res.ok) return false;

				const data = await res.json();
				user.id = data.userId;
				return true;
			} catch {
				return false;
			}
		},

		async jwt({ token, user }) {
			if (user) {
				token.userId = user.id;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				(session.user as any).userId = token.userId;
			}
			return session;
		},
	},
	pages: {
		signIn: "/",
	},
};
