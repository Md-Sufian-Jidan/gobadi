"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";
import logoSquare from "@/assets/gobaadi-logo-square.svg";
import dashboardMenuIcon1 from "@/assets/dashboard-menu-icon-1.svg";
import dashboardMenuIcon2 from "@/assets/dashboard-menu-icon-2.svg";
import dashboardMenuIcon3 from "@/assets/dashboard-menu-icon-3.svg";
import dashboardMenuIcon4 from "@/assets/dashboard-menu-icon-4.svg";
import dashboardMenuIcon5 from "@/assets/dashboardanimallist.svg";

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
      icon: dashboardMenuIcon1,
      active: pathname === "/dashboard" || pathname === "/dashboard/",
    },
    {
      name: "User List",
      href: "/dashboard/user-list",
      icon: dashboardMenuIcon2,
      isDropdown: true,
      count: "11,200",
      isOpen: userListOpen,
      onToggle: () => setUserListOpen(!userListOpen),
      subItems: [
        {
          name: "Farmers",
          href: "/dashboard/user-list/farmers",
          count: "8,000",
          active: pathname === "/dashboard/user-list/farmers",
        },
        {
          name: "Doctors",
          href: "/dashboard/user-list/doctors",
          count: "3,200",
          active: pathname === "/dashboard/user-list/doctors",
        },
      ],
    },
    {
      name: "Animal List",
      href: "/dashboard/animal-list",
      icon: dashboardMenuIcon5,
      active: pathname === "/dashboard/animal-list",
    },
    {
      name: "Push Notifications",
      href: "/dashboard/notifications",
      icon: dashboardMenuIcon3,
      active: pathname === "/dashboard/notifications",
    },
    {
      name: "Admin Access",
      href: "/dashboard/admin-access",
      icon: dashboardMenuIcon4,
      active: pathname === "/dashboard/admin-access",
    },
  ];

  return (
    <div className="flex flex-col h-full select-none overflow-hidden bg-white">
      {/* Header with logo & toggle */}
      <div className="p-4 flex items-center justify-between border-b border-[#F5F2EC]">
        <Link
          href="/"
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
          if (item.isDropdown) {
            const isItemActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={index} className="space-y-1">
                <div
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 ${item.isOpen || isItemActive
                    ? "bg-[#F1F1F1] text-[#1A1A1A]"
                    : "text-[#525252] hover:bg-[#F1F1F1] hover:text-[#1A1A1A]"
                    }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (onItemClick) onItemClick();
                      if (!item.isOpen) item.onToggle();
                    }}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="p-2 text-[#1A1A1A] bg-white rounded-xl shadow-xs border border-[#EBE8E2] shrink-0">
                      <Image
                        src={item.icon}
                        alt="Dashboard menu icon"
                        width={18}
                        height={18}
                      />
                    </div>
                    {!collapsed && (
                      <span className="font-bold text-sm text-[#1A1A1A] whitespace-nowrap truncate">
                        {item.name}
                      </span>
                    )}
                  </Link>

                  {!collapsed && (
                    <div className="flex items-center gap-2 shrink-0">
                      {item.count && (
                        <span className="text-xs font-semibold text-[#737373] bg-[#F1F1F1] border-2 border-[#ECECEC] px-2.5 py-1 rounded-xl">
                          {item.count}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          item.onToggle();
                        }}
                        className="p-1 hover:bg-[#E5E0D8] rounded-lg transition-colors cursor-pointer"
                        title={item.isOpen ? "Collapse submenu" : "Expand submenu"}
                      >
                        <motion.div
                          animate={{ rotate: item.isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-[#737373]" />
                        </motion.div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Submenu Tree structure */}
                {!collapsed && (
                  <AnimatePresence>
                    {item.isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-7 pt-1 space-y-2 relative"
                      >
                        {item.subItems?.map((sub, sIdx) => {
                          const isLast = sIdx === item.subItems.length - 1;

                          return (
                            <div key={sIdx} className="relative flex items-center pl-6">
                              {/* Tree Line Connectors */}
                              <span
                                className={`absolute left-2 text-[#E2DDD4] pointer-events-none font-mono text-sm leading-none ${isLast ? "-top-2.5" : "-top-1"
                                  }`}
                                style={{
                                  borderLeft: "2px solid #ECECEC",
                                  borderBottom: "2px solid #ECECEC",
                                  borderBottomLeftRadius: "8px",
                                  width: "14px",
                                  height: isLast ? "24px" : "32px",
                                }}
                              />

                              <Link
                                href={sub.href}
                                onClick={onItemClick}
                                className={`w-full flex items-center justify-between py-1.5 px-2 rounded-md text-xs font-semibold transition-colors ${sub.active
                                  ? "text-[#1A1A1A]"
                                  : "text-[#737373] hover:text-[#1A1A1A]"
                                  }`}
                              >
                                <span>{sub.name}</span>
                                {sub.count && (
                                  <span className="text-xs font-medium text-[#737373] bg-[#F1F1F1] border border-[#ECECEC] px-2 py-0.5 rounded-md">
                                    {sub.count}
                                  </span>
                                )}
                              </Link>
                            </div>
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
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${isActive
                ? "bg-[#F1F1F1] text-[#1A1A1A] font-semibold"
                : "text-[#525252] hover:bg-[#F1F1F1] hover:text-[#1A1A1A]"
                }`}
            >
              <div
                className={`p-2 rounded-xl transition-colors ${isActive
                  ? "bg-white border border-[#E0D8CC] text-[#1A1A1A]"
                  : "text-[#525252]"
                  }`}
              >
                <Image
                  src={item.icon}
                  alt="Dashboard menu icon"
                  width={18}
                  height={18}
                />
              </div>
              {!collapsed && (
                <span className="font-semibold text-sm whitespace-nowrap text-[#1A1A1A]">
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
          className="flex items-center gap-3 p-2.5 rounded-xl text-[#525252] hover:bg-[#FAF8F5] hover:text-[#1A1A1A] transition-all duration-200"
        >
          <div className="p-2 rounded-xl text-[#525252]">
            <Settings className="w-5 h-5 text-[#1A1A1A]" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm whitespace-nowrap text-[#1A1A1A]">
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