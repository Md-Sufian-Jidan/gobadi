import Image from "next/image";
import gobadi_logo from "@/assets/hero_gobadi_logo.png";
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-accent pt-12 pb-8">
            <div className="flex flex-col items-center justify-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <div>
                        <Image
                            src={gobadi_logo}
                            alt="Gobadi logo"
                            width={56}
                            height={56}
                            className="object-contain rounded-[10px]"
                        />
                    </div>
                    <span className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white leading-none font-bengali">
                        গবাদি
                    </span>
                </Link>

                <nav className="flex gap-6 sm:gap-8 justify-center mt-6 text-white font-semibold text-xl sm:text-base font-display" aria-label="Footer navigation">
                    <Link href="#about" className="hover:text-white transition-colors">About Us</Link>
                    <Link href="#our-vision" className="hover:text-white transition-colors">Our Vision</Link>
                    <Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link>
                </nav>

                <div className="w-full border-t border-white mt-8 mb-6" />

                <p className="text-white text-xl font-normal text-center tracking-wide">
                    © {year} gobadi. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
