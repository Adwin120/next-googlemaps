import { pool, query } from "@/db/dbConnection";
import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import PGAdapter from "@auth/pg-adapter"

const authOptions: AuthOptions = {
    adapter: PGAdapter(pool),
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session(params) {
            params.session.user.id = Number(params.user.id);
            return params.session;
        },
    },
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
    // debug: true,
};

export default authOptions;
