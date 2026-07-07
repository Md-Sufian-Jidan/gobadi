import ResuableTitleDescription from "@/components/shared/ResuableTitleDescription";
import Image from "next/image";
import iconEcosystem from '@/assets/AnimalCareEcosystem.png';
import iconConsultation from '@/assets/DoctorConsultationNetwork.png';
import iconInsights from '@/assets/Al-PoweredInsights&Marketplace.png';

import imgVetCow from '@/assets/our_vision_vet_cow.png';
import imgFarmersHands from '@/assets/our_vision_farmers_hands.png';
import imgFarmerSheep from '@/assets/our_vision_farmer_sheep.png';
import imgCowFence from '@/assets/our_vision_cow_fence.png';

export default async function OurVission() {
    return (
        <section className="w-full py-16 md:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left Column: Title, Description, and Features */}
                    <div className="lg:col-span-7 flex flex-col gap-10">
                        <ResuableTitleDescription 
                            subTitle="OUR VISIONS" 
                            title="Empowering Smarter Animal Care Through AI" 
                            description="Gobadi is building a unified digital ecosystem where animal care becomes faster, smarter, and more accessible. Our goal is to improve animal wellbeing through AI-driven insights, expert consultation, and trusted marketplace solutions." 
                            align="left"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-4 border-t border-accent/10">
                            {/* Feature 1 */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Image
                                        src={iconEcosystem}
                                        alt="Animal Care Ecosystem"
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-lg font-bold text-primary font-display">
                                        Animal Care Ecosystem
                                    </h4>
                                    <p className="text-secondary text-sm md:text-base font-normal leading-relaxed">
                                        A complete platform for pet health, care guidance, and daily wellbeing support.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Image
                                        src={iconConsultation}
                                        alt="Doctor Consultation Network"
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-lg font-bold text-primary font-display">
                                        Doctor Consultation Network
                                    </h4>
                                    <p className="text-secondary text-sm md:text-base font-normal leading-relaxed">
                                        Instant access to veterinary professionals for reliable diagnosis and treatment advice.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex gap-4 items-start md:col-span-2">
                                <div className="flex-shrink-0 mt-1">
                                    <Image
                                        src={iconInsights}
                                        alt="AI-Powered Insights & Marketplace"
                                        width={24}
                                        height={24}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="space-y-1.5 max-w-xl">
                                    <h4 className="text-lg font-bold text-primary font-display">
                                        AI-Powered Insights & Marketplace
                                    </h4>
                                    <p className="text-secondary text-sm md:text-base font-normal leading-relaxed">
                                        Smart AI results for better decisions, plus a marketplace for services, products, and care solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visual Overlapping Images */}
                    <div className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center max-w-[550px] mx-auto mt-8 lg:mt-0">
                        {/* Soft peach circular background shape */}
                        <div className="absolute top-[8%] left-[8%] w-[78%] h-[78%] bg-[#FFF6F3] rounded-full -z-10" />

                        {/* Top circular image (Vet checking cow) */}
                        <div className="absolute top-[10%] left-[16%] w-[48%] aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden z-20">
                            <Image
                                src={imgVetCow}
                                alt="Veterinarian checking cow"
                                fill
                                sizes="(max-width: 768px) 50vw, 30vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Bottom circular image (Farmers shaking hands) */}
                        <div className="absolute bottom-[6%] left-[23%] w-[52%] aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden z-40">
                            <Image
                                src={imgFarmersHands}
                                alt="Farmers shaking hands at farm"
                                fill
                                sizes="(max-width: 768px) 50vw, 35vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Middle-right circular image (Farmer with sheep) */}
                        <div className="absolute top-[38%] right-[0%] w-[33%] aspect-square rounded-full border-4 border-white shadow-lg overflow-hidden z-30">
                            <Image
                                src={imgFarmerSheep}
                                alt="Farmer feeding sheep in barn"
                                fill
                                sizes="(max-width: 768px) 30vw, 20vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Top-right small circular image (Cow fence) */}
                        <div className="absolute top-[6%] right-[16%] w-[15%] aspect-square rounded-full border-[3px] border-white shadow-md overflow-hidden z-20">
                            <Image
                                src={imgCowFence}
                                alt="Cow looking over fence"
                                fill
                                sizes="(max-width: 768px) 15vw, 10vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Solid terracotta circle behind bottom image */}
                        <div className="absolute bottom-[44%] left-[15%] w-[13%] aspect-square rounded-full bg-[#C86433] z-10 shadow-md" />

                        {/* Small solid peach circle behind top-right cow image */}
                        <div className="absolute top-[3%] right-[12%] w-[9%] aspect-square rounded-full bg-[#E8DCC4] z-10 shadow-sm" />
                    </div>

                </div>
            </div>
        </section>
    );
}