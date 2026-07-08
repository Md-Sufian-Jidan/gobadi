import Image from "next/image";
import gobadi_logo from "@/assets/gobadi_logo.webp";
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-accent pt-12 pb-8 border-t border-white/10">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-white rounded-xl p-2 w-11 h-11 flex items-center justify-center shadow-md">
                        <Image
                            src={gobadi_logo}
                            alt="Gobadi logo"
                            width={28}
                            height={28}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white leading-none font-bengali">
                        গবাদি
                    </span>
                </Link>

                <nav className="flex gap-6 sm:gap-8 justify-center mt-6 text-white/90 font-semibold text-sm sm:text-base font-display" aria-label="Footer navigation">
                    <a href="#about" className="hover:text-white transition-colors">About Us</a>
                    <a href="#our-vision" className="hover:text-white transition-colors">Our Vision</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
                </nav>

                <div className="w-full max-w-7xl border-t border-white/15 mt-8 mb-6" />

                <p className="text-white/70 text-xs sm:text-sm font-normal text-center tracking-wide font-sans">
                    © {year} gobadi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
