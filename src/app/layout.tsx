import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/lib/providers";

const sora = Work_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Ethiopian Date Picker",
  description: "A date picker component with Ethiopian calendar support",
  icons: {
    icon: [
      {
        url: "/fav.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
