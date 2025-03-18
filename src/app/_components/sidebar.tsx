"use client";

import Link from "next/link";
import { Key, ReactNode } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { FaBitcoin, FaCoins } from "react-icons/fa6";

interface SideMenu {
  id: Key;
  name: string;
  icon: ReactNode;
  link: string;
}

interface SideBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}
export default function SideBar({ isCollapsed, setIsCollapsed }: SideBarProps) {
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const menus: SideMenu[] = [
    {
      id: 1,
      name: "Stock",
      icon: <LiaMoneyCheckAltSolid size={16}/>,
      link: "/stock",
    },
    {
      id: 2,
      name: "Crypto",
      icon: <FaBitcoin size={16}/>,
      link: "/crypto",
    },
    {
      id: 3, 
      name: "Meme Coin",
      icon: <FaCoins size={16}/>,
      link: "/meme",
    },
  ];

  return (
    <div className={`fixed top-0 left-0 h-screen text-white flex flex-col ${isCollapsed ? "w-16" : "w-48"} transition-all duration-300`}>
      <div className="flex items-center justify-between h-16 border-b border-gray-700 p-4">
        {!isCollapsed && (
          <h1 className="text-lg font-bold">
            <Link href="/">Bhannk</Link>
          </h1>
        )}

        <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none">
          {isCollapsed ? <AiOutlineMenu size={16} /> : <AiOutlineClose size={16} />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <nav className="mt-10">
          {menus.map((menu) => (
            <Link href={menu.link} key={menu.id} prefetch={true}>
              <div
                className={`flex items-center py-3 px-4 rounded transition duration-300 hover:bg-[#1B1A1D] hover:text-white-400 ${
                  isCollapsed ? "justify-center" : ""}`}
              >
                {menu.icon}
                <span className={`ml-2 transition-opacity duration-300 delay-200 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>
                  {!isCollapsed && menu.name}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
