"use client";

// import type { Metadata } from "next";
import "./globals.css";
import SideBar from "../app/_components/sidebar";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Bhannk",
//   description: "Stock market at its finest",
// };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <html lang="en">
      <body className="flex">
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        <div
          className={`flex-grow min-h-screen transition-all duration-300 ${
            isCollapsed ? "pl-16" : "pl-48"
          }`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
