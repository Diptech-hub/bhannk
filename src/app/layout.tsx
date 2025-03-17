import type { Metadata } from "next";
import "./globals.css";
import SideBar from "../app/_components/sidebar";

export const metadata: Metadata = {
  title: "Bhannk",
  description: "Stock market at its finest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <SideBar />
        <div className="flex-grow ">{children}</div>
      </body>
    </html>
  );
}
