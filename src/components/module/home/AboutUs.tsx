import Image from "next/image";

export default async function AboutUs() {
    return (
        <section id="about" className="w-full bg-background overflow-hidden relative flex flex-col pt-12">
            
            {/* Top Sky Dome Wrapper */}
            <div className="w-[94%] mx-auto bg-[#DCEEFE] rounded-t-[50%_40px] md:rounded-t-[50%_100px] lg:rounded-t-[50%_140px] pt-16 pb-36 md:pb-48 px-4 md:px-8 text-center relative overflow-hidden border-t border-x border-accent-light/10">
                {/* Cloud Background overlay */}
                <div className="absolute inset-0 z-0 opacity-55 pointer-events-none">
                    <Image
                        src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80"
                        alt="Sky and cloud cover"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Container */}
                <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#FFF6F3] py-1.5 px-4 md:py-2 md:px-5 rounded-full border border-accent/20 mb-6 shadow-sm">
                        <span className="text-xs md:text-sm font-bold font-display uppercase tracking-widest text-accent">
                            ABOUT US
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[54px] text-primary tracking-tight leading-[1.1] mb-6">
                        Who we are
                    </h2>

                    {/* Description */}
                    <p className="text-[#1A1A1A] font-medium text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                        Our platform enables farmers to access veterinary care, book services from licensed veterinarians, receive AI-assisted health insights, and generate personalized livestock management content. Veterinarians can also use AI to create educational content, share expert knowledge, and provide digital consultations more efficiently.
                    </p>
                </div>
            </div>

            {/* Bottom Golden Wheat Field Backdrop containing staggered cards */}
            <div className="w-full relative pt-20 pb-16 md:pt-28 md:pb-24 bg-[#D28941]" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                {/* Visual Blending Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />

                {/* Overlapping Staggered Cards container */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 -mt-44 md:-mt-64 lg:-mt-72">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
                        
                        {/* Card 1: Farmer holding lamb */}
                        <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden border-[6px] border-white shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-white/5">
                            <Image
                                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80"
                                alt="Farmer smiling holding a fluffy lamb"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>

                        {/* Card 2: Veterinarian and Cow (Staggered upward on desktop) */}
                        <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden border-[6px] border-white shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-white/5 md:-translate-y-8 lg:-translate-y-12">
                            <Image
                                src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80"
                                alt="Veterinarian examining cows inside a barn"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>

                        {/* Card 3: Indian woman holding turkey */}
                        <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden border-[6px] border-white shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-white/5">
                            <Image
                                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80"
                                alt="Farmer holding white turkey poultry"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}