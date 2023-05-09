import { ScoreContextProvider } from "@/context/score.context";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MEMOVAS",
  description: "Created by @lolelu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScoreContextProvider>
          <main className="flex min-h-screen flex-col items-center justify-center p-12">
            {children}
          </main>
        </ScoreContextProvider>
      </body>
    </html>
  );
}
