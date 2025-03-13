"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`h-screen text-[foreground] flex flex-col ${isCollapsed ? 'w-16' : 'w-48'} transition-all duration-300`}>
      <div className="flex items-center justify-between h-16 border-b border-grey-700 p-4">
        {!isCollapsed && (
          <h1 className="text-lg font-bold text-[foreground]">
            <Link href=""> Bhannk</Link>
          </h1>
        )}

        <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-[foreground] focus:outline-none"
        >
          {isCollapsed ? <AiOutlineMenu size={16} /> : <AiOutlineClose size={16} />}
        </button>
      </div>
    </div>
  );
}
