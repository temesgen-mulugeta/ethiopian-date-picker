import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const sora = Work_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Ethiopian Date Picker",
  description: "A date picker component with Ethiopian calendar support",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
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
      </body>
    </html>
  );
}
