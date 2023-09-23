import MainLayoutContext from "@/components/layout/MainLayoutContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/authentication/ClientSessionProvider";
import getDbSession from "@/auth/getDbSession";

const inter = Inter({ subsets: ["latin"], preload: false });

export const metadata: Metadata = {
    title: "MyPlace",
    description: "map oriented social platform",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getDbSession();
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <MainLayoutContext>{children}</MainLayoutContext>
                </SessionProvider>
            </body>
        </html>
    );
}
