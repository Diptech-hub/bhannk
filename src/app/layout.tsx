import type { Metadata } from "next";
import "./globals.css";


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
      <body
      >
        <h1>Bhannk</h1>
        {children}
      </body>
    </html>
  );
}
