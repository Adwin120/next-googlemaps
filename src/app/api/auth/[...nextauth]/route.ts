import authOptions from "@/auth/options";
import PGAdapter from "@/auth/pgAdapter";
import { db, query } from "@/db/dbConnection";
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
