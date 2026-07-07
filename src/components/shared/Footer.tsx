import Image from "next/image";
import gobadi_logo from "@/assets/gobadi_logo.webp";

export default function Footer() {
    return (
        <footer className="flex w-full items-center justify-center bg-gray-700 p-4">
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
            </div>        </footer>
    );
}