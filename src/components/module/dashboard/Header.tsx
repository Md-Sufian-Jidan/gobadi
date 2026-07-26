"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, X, Command, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import dashboardDemoProfile from "@/assets/dashboar-user-avatar.svg"
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(true);

  // Keyboard shortcut Cmd/Ctrl + K to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="bg-white border border-[#EAE5DD] shadow-xs rounded-[20px] sm:rounded-[24px] px-3.5 sm:px-6 py-3 flex items-center justify-between gap-3 z-10">
        {/* Mobile Menu Button + Search Input */}
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          {onOpenMobileMenu && (
            <Button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2.5 rounded-xl sm:rounded-2xl bg-[#F7F4EE] hover:bg-[#EFEAE4] text-[#1A1A1A] border border-[#E5E0D8] transition-colors cursor-pointer shrink-0"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-[#1A1A1A]" />
            </Button>
          )}

          <div className="relative flex-1">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#F8F7F7] border border-[#E2E2E2] rounded-xl text-left text-xs sm:text-sm text-[#737373] hover:border-[#C0612B80] transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Search className="w-4 h-4 text-[#737373] group-hover:text-[#1A1A1A] transition-colors" />
                <span className="font-medium">Search...</span>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-3 py-1.5 text-[10px] font-semibold text-[#737373] bg-white border border-[#E0D8CC] rounded-lg shadow-2xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setUnreadNotifications(!unreadNotifications)}
              className="relative p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-[#1A1A1A] transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#1A1A1A]" />
              {unreadNotifications && (
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#EF4444] rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>
          </div>

          <div className="hidden md:flex flex-col justify-end">
            <h6 className="font-semibold text-base text-primary">Istiak Ratul</h6>
            <p className="text-[10px] text-[#121212]">Super Admin</p>
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <Image src={dashboardDemoProfile} alt="Dashboard Demo Profile" width={40} height={40} className="hidden md:block w-full h-full object-cover" />
            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden block">
                <Image src={dashboardDemoProfile} alt="Dashboard Demo Profile" width={40} height={40} className="block w-full h-full object-cover" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup className="p-2">
                  <DropdownMenuItem className="font-semibold text-base text-primary">Istiak Ratul</DropdownMenuItem>
                  <DropdownMenuItem className="text-[10px] text-[#121212]">Super Admin</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Quick Search Dialog Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5DD] shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-4 border-b border-[#F5F2EC] flex items-center gap-3">
                <Search className="w-5 h-5 text-[#737373]" />
                <input
                  type="text"
                  placeholder="Search farmers, doctors, analytics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[#1A1A1A] placeholder-[#737373]"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-lg text-[#737373] hover:text-[#1A1A1A] hover:bg-[#F7F4EE] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 max-h-64 overflow-y-auto space-y-2 text-xs text-[#525252]">
                <p className="font-semibold text-[10px] text-[#737373] uppercase tracking-wider px-2">
                  Quick Actions
                </p>
                <div className="p-2.5 rounded-xl hover:bg-[#F7F4EE] cursor-pointer flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1A1A1A]">
                    View Doctor Consultations
                  </span>
                  <span className="text-[10px] text-[#C1652F] bg-[#FBE6DA] px-2 py-0.5 rounded-md font-semibold">
                    Doctors
                  </span>
                </div>
                <div className="p-2.5 rounded-xl hover:bg-[#F7F4EE] cursor-pointer flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1A1A1A]">
                    Farmer Registrations
                  </span>
                  <span className="text-[10px] text-[#C1652F] bg-[#FBE6DA] px-2 py-0.5 rounded-md font-semibold">
                    Farmers
                  </span>
                </div>
                <div className="p-2.5 rounded-xl hover:bg-[#F7F4EE] cursor-pointer flex items-center justify-between">
                  <span className="font-medium text-sm text-[#1A1A1A]">
                    App Downloads & OS Retention
                  </span>
                  <span className="text-[10px] text-[#C1652F] bg-[#FBE6DA] px-2 py-0.5 rounded-md font-semibold">
                    Analytics
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
