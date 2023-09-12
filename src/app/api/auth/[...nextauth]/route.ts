import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_OAUTH_ID!,
            clientSecret: process.env.GITHUB_OAUTH_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID!,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
        }),
    ],
});

export { handler as GET, handler as POST };
