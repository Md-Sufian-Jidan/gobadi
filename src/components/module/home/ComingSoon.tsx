import Image from "next/image";
import imgComingSoon from "@/assets/coming_soon_app.png";

export default async function ComingSoon() {
    return (
        <section className="w-full py-16 md:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Heading and Custom Badge */}
                    <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 items-start">

                        {/* Something New Is Text */}
                        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[64px] text-primary tracking-tight leading-[1.1] uppercase">
                            Something <br /> New Is
                        </h2>

                        {/* COMING SOON Custom Inset Badge */}
                        <div className="bg-accent rounded-3xl p-3 md:p-4 inline-block max-w-fit shadow-lg shadow-accent/15">
                            <div className="border-[3.5px] border-white rounded-[20px] px-8 py-4 md:px-14 md:py-6 flex flex-col items-center justify-center leading-none font-display">
                                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-[0.08em] text-white">COMING</span>
                                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-[0.08em] text-white mt-1 md:mt-2">SOON</span>
                            </div>
                        </div>

                        {/* Under-text Description */}
                        <p className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-semibold text-primary leading-snug mt-2 max-w-xl">
                            Our new and improved <br className="hidden sm:inline" /> digital livestock platform.
                        </p>

                    </div>

                    {/* Right Column: Teardrop/Leaf-Cropped Smartphone Graphic */}
                    <div className="lg:col-span-5 w-full flex items-center justify-center mt-6 lg:mt-0">
                        <div className="relative w-full aspect-square max-w-[450px] md:max-w-[480px]">
                            {/* Organic teardrop shape with bottom-left accent border */}
                            <div className="w-full h-full rounded-[50%_50%_50%_12%] border-l-[10px] border-b-[10px] border-accent/90 overflow-hidden relative shadow-xl shadow-slate-900/10">
                                <Image
                                    src={imgComingSoon}
                                    alt="Gobadi mobile application dashboard preview"
                                    fill
                                    className="object-cover scale-[1.02]"
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}