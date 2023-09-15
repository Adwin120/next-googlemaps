import PGAdapter from "@/auth/pgAdapter";
import { db, query } from "@/db/dbConnection";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// TODO: change to official adapter once its merged
const handler = NextAuth({
    adapter: PGAdapter(query),
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
