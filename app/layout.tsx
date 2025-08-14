
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  return {
    title: "KeyChat - Own Your Community Access",
    description: "Decentralized platform for creators to build and monetize exclusive chat communities using transferable, tokenized access keys with automated revenue sharing on Base.",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `${URL}/hero.png`,
        button: {
          title: "Launch KeyChat",
          action: {
            type: "launch_frame",
            name: "KeyChat",
            url: URL,
            splashImageUrl: `${URL}/splash.png`,
            splashBackgroundColor: "#f8fafc",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
