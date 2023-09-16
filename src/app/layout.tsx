import TopBarAndDrawerLayoutContext from "@/components/layoutContexts/TopBarAndDrawerLayoutContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/utils/ClientSessionProvider";
import getDbSession from "@/auth/getDbSession";

const inter = Inter({ subsets: ["latin"], preload: false });

export const metadata: Metadata = {
    title: "nextjs googlemaps",
    description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getDbSession();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <TopBarAndDrawerLayoutContext>{children}</TopBarAndDrawerLayoutContext>
                </SessionProvider>
            </body>
        </html>
    );
}
