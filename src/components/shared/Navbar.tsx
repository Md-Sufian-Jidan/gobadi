import Image from "next/image";
import gobadi_logo from "@/assets/gobadi_logo.webp";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-accent-light/30 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative p-1 rounded-xl bg-accent-light/25 group-hover:bg-accent-light/45 transition-colors">
              <Image
                src={gobadi_logo}
                alt="gobadi-logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
                গবাদি
              </h2>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#"
              className="text-foreground/80 hover:text-accent font-medium transition-colors text-sm tracking-wide"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-foreground/80 hover:text-accent font-medium transition-colors text-sm tracking-wide"
            >
              About Us
            </Link>
            <Link
              href="#vision"
              className="text-foreground/80 hover:text-accent font-medium transition-colors text-sm tracking-wide"
            >
              Our Vision
            </Link>

          </nav>
          <div>
            <button className="bg-accent text-background hover:bg-accent/90 transition-all font-semibold font-display px-6 py-2.5 rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5 text-sm active:translate-y-0 duration-200 cursor-pointer">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}