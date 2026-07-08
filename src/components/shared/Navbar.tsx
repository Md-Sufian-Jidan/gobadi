import Image from "next/image";
import gobadi_logo from "@/assets/gobadi_logo.webp";
import Link from "next/link";
import { BiSolidZap } from "react-icons/bi";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-1.5 rounded-xl border border-gray-100 shadow-sm transition-colors">
              <Image
                src={gobadi_logo}
                alt="Gobadi logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="text-3xl font-bold tracking-tight text-primary font-bengali">
              গবাদি
            </span>
          </Link>

          <div className="flex flex-row items-center justify-between gap-6">
            <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
              <Link
                href="/"
                className="text-primary font-bold transition-colors text-[15px]"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-secondary hover:text-primary font-medium transition-colors text-[15px]"
              >
                About Us
              </Link>
              <Link
                href="#our-vision"
                className="text-secondary hover:text-primary font-medium transition-colors text-[15px]"
              >
                Our Vision
              </Link>
            </nav>

            <Link
              href="#contact"
              className="flex items-center gap-2 bg-border text-white hover:bg-accent transition-all font-semibold px-6 py-3 rounded-2xl shadow-sm text-[15px]"
            >
              <BiSolidZap size={18} fill="currentColor" aria-hidden />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
