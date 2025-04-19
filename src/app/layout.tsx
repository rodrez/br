import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Brand Ranks",
	description: "Compare and find the best products",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${geist.variable}`}>
			<body>
				<div className="app">
					<TRPCReactProvider>
						<Toaster />
						<Header />
						<main className="mb-auto">
							{children}
						</main>
						<Footer />
					</TRPCReactProvider>
				</div>

			</body>
		</html>
	);
}
