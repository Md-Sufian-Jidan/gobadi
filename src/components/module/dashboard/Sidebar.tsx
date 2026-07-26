"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Users,
  Zap,
  Fingerprint,
  Settings,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  UserCheck,
  Stethoscope,
  Wheat,
} from "lucide-react";
import logoSquare from "@/assets/gobaadi-logo-square.svg";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onItemClick?: () => void;
}

export const SidebarContent: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggleCollapse,
  onItemClick,
}) => {
  const pathname = usePathname();
  const [userListOpen, setUserListOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
      active: pathname === "/dashboard" || pathname === "/dashboard/",
    },
    {
      name: "User List",
      icon: Users,
      isDropdown: true,
      isOpen: userListOpen,
      onToggle: () => setUserListOpen(!userListOpen),
      subItems: [
        { name: "Farmers", href: "/dashboard/users/farmers", icon: Wheat },
        { name: "Doctors", href: "/dashboard/users/doctors", icon: Stethoscope },
        { name: "General Users", href: "/dashboard/users/all", icon: UserCheck },
      ],
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Zap,
      active: pathname === "/dashboard/notifications",
    },
    {
      name: "Admin Access",
      href: "/dashboard/admin-access",
      icon: Fingerprint,
      active: pathname === "/dashboard/admin-access",
    },
  ];

  return (
    <div className="flex flex-col h-full select-none overflow-hidden">
      {/* Header with logo & toggle */}
      <div className="p-4 flex items-center justify-between border-b border-[#F5F2EC]">
        <Link
          href="/dashboard"
          onClick={onItemClick}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-[#FBE6DA] flex items-center justify-center border border-[#E8DCC4]">
            <Image
              src={logoSquare}
              alt="Gobaadi Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-[#1A1A1A] tracking-tight font-display whitespace-nowrap">
              গবাদী
            </span>
          )}
        </Link>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:block p-2 rounded-xl text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] transition-colors focus:outline-none cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Main Nav items */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          if (item.isDropdown) {
            return (
              <div key={index} className="space-y-1">
                <button
                  onClick={item.onToggle}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${item.isOpen
                      ? "bg-[#F7F4EE] text-[#1A1A1A]"
                      : "text-[#525252] hover:bg-[#FAF8F5] hover:text-[#1A1A1A]"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white border border-[#E8E2D9] text-[#1A1A1A]">
                      <Icon className="w-4 h-4" />
                    </div>
                    {!collapsed && (
                      <span className="font-semibold text-sm whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {!collapsed && (
                    <motion.div
                      animate={{ rotate: item.isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#737373]" />
                    </motion.div>
                  )}
                </button>

                {/* Submenu */}
                {!collapsed && (
                  <AnimatePresence>
                    {item.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-11 space-y-1"
                      >
                        {item.subItems?.map((sub, sIdx) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              onClick={onItemClick}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#525252] hover:bg-[#F7F4EE] hover:text-[#C1652F] transition-colors"
                            >
                              <SubIcon className="w-3.5 h-3.5" />
                              <span>{sub.name}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          }

          const isActive = item.active;

          return (
            <Link
              key={index}
              href={item.href || "#"}
              onClick={onItemClick}
              className={`flex items-center gap-3 p-2.5 rounded-2xl transition-all duration-200 ${isActive
                  ? "bg-[#EFEAE4] text-[#1A1A1A] font-semibold"
                  : "text-[#525252] hover:bg-[#FAF8F5] hover:text-[#1A1A1A]"
                }`}
            >
              <div
                className={`p-2 rounded-xl border transition-colors ${isActive
                    ? "bg-white border-[#E0D8CC] text-[#1A1A1A]"
                    : "bg-white border-[#E8E2D9] text-[#525252]"
                  }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              {!collapsed && (
                <span className="font-semibold text-sm whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer item: Settings */}
      <div className="p-3 border-t border-[#F5F2EC]">
        <Link
          href="/dashboard/settings"
          onClick={onItemClick}
          className="flex items-center gap-3 p-2.5 rounded-2xl text-[#525252] hover:bg-[#FAF8F5] hover:text-[#1A1A1A] transition-all duration-200"
        >
          <div className="p-2 rounded-xl bg-white border border-[#E8E2D9] text-[#525252]">
            <Settings className="w-4 h-4" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm whitespace-nowrap">
              Settings
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <motion.aside
      animate={{ width: props.collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden lg:flex bg-white border border-[#EAE5DD] shadow-xs rounded-[24px] flex-col h-[calc(100vh-2rem)] sticky top-4 overflow-hidden z-20 shrink-0"
    >
      <SidebarContent {...props} />
    </motion.aside>
  );
};
