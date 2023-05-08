import { ScoreContextProvider } from "@/context/score.context";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <main className="flex min-h-screen flex-col items-center justify-center p-24">
            {children}
          </main>
        </ScoreContextProvider>
      </body>
    </html>
  );
}
