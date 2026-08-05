"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import gobadiLogo from "@/assets/gobadiLogo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      href: "/",
      active: true,
    },
    {
      title: "Our Vision",
      href: "#our-vision",
    },
    {
      title: "About Us",
      href: "#about",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#FFF5EE]">
              <Image
                src={gobadiLogo}
                alt="Gobadi logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-bengali text-2xl font-bold text-black sm:text-3xl">
              গবাদি
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <nav aria-label="Main navigation" className="flex items-center gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${item.active
                    ? "bg-[#FFF5EE] text-[#D0622D] border border-[#FDE1D3]"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link
              href="#contact"
              className="flex items-center gap-2 rounded-2xl bg-[#D0622D] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b85323] active:scale-[0.98]"
            >
              <Zap className="h-4 w-4 fill-white" />
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gray-100 bg-white md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2 p-4">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${item.active
                    ? "bg-[#FFF5EE] text-[#D0622D] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {item.title}
                </Link>
              ))}

              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D0622D] py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#b85323]"
              >
                <Zap className="h-5 w-5 fill-white" />
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}