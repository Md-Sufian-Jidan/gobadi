"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidZap } from "react-icons/bi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import gobadiLogo from "@/assets/gobadiLogo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About Us",
      href: "#about",
    },
    {
      title: "Our Vision",
      href: "#our-vision",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div>
              <Image
                src={gobadiLogo}
                alt="Gobadi logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>

            <span className="font-bengali text-2xl font-bold text-primary sm:text-3xl">
              গবাদি
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            <nav aria-label="Main navigation" className="flex items-center gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="font-medium text-primary  transition hover:text-secondary"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <Link
              href="#contact"
              className="flex items-center gap-2 rounded-2xl bg-border px-6 py-3 font-semibold text-white transition hover:bg-accent"
            >
              <BiSolidZap size={18} />
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 md:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-96 pb-6" : "max-h-0"
            }`}
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-5 pt-4">
            {navLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-primary"
              >
                {item.title}
              </Link>
            ))}

            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-border px-6 py-3 font-semibold text-white transition hover:bg-accent"
            >
              <BiSolidZap size={18} />
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}