"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  const dashboardLinks = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/analytics", label: "Analytics", icon: "📈" },
    { href: "/dashboard/products", label: "Products", icon: "📦" },
    { href: "/dashboard/orders", label: "Orders", icon: "🛒" },
    { href: "/dashboard/customers", label: "Customers", icon: "👥" },
    { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
  ];

  const baseClasses = `fixed left-0 top-0 h-full bg-[#0F172A] text-gray-200 transition-all duration-300 z-[100]`;
  const desktopClasses = `w-64 hidden md:block`;
  const mobileClasses = isOpen
    ? "w-64 translate-x-0"
    : "w-64 -translate-x-full md:hidden";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[99] md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`${baseClasses} ${desktopClasses} ${mobileClasses}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-20 flex items-center px-5 border-b border-gray-700">
            <h1 className="text-xl font-bold">Shopies</h1>
            <button
              className="ml-auto md:hidden"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {dashboardLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#0A84FF] text-white"
                          : "hover:bg-gray-800 text-gray-200"
                      }`}
                      onClick={() => onClose?.()}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800">
              <div className="w-8 h-8 rounded-full bg-[#0A84FF] flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">User</p>
                <p className="text-xs text-gray-400">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
