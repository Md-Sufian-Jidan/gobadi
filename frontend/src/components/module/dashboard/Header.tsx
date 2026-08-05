"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Command, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import dashboardDemoProfile from "@/assets/dashboar-user-avatar.svg"
import Image from "next/image";
import Notification from "@/components/shared/Notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import filtericon from "@/assets/filter-icon.svg"
import filterarrowicon from "@/assets/filter-arrow-icon.svg"
import magnifyingglassicon from "@/assets/magnifyingglass.svg"

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export default function Header({ onOpenMobileMenu }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

          <div className="relative flex items-center w-full md:w-64">
            <Image
              src={magnifyingglassicon}
              alt="magnifyingglassicon"
              width={18}
              height={18}
              className="absolute left-3.5 w-4 h-4 pointer-events-none z-10 opacity-70"
            />
            <Input
              type="text"
              // value={searchValue}
              // onChange={(e) => onSearchChange(e.target.value)}
              placeholder={"Search..."}
              className="h-10 w-full pl-9 pr-14 text-xs sm:text-sm bg-[#F8F7F7] border border-[#E2E2E2] rounded-[12px] text-[#1A1A1A] placeholder:text-[#737373] focus-visible:ring-0 focus-visible:border-[#CCCCCC] focus-visible:bg-white transition-all shadow-none"
            />
            <Kbd className="absolute right-2 z-10 h-6 px-2 py-0.5 text-[11px] font-medium text-[#525252] bg-gradient-to-b from-[#FFFFFF] to-[#EAEAEA] border border-[#D4D4D4] rounded-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
              ⌘ K
            </Kbd>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Notifications Dropdown */}
          <Notification />

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
