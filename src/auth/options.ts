import { query } from "@/db/dbConnection";
import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import PGAdapter from "./pgAdapter";


const authOptions: AuthOptions = {
    adapter: PGAdapter(query),
    secret: process.env.NEXTAUTH_SECRET,

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
}

export default authOptions