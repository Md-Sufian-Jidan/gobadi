import Image from "next/image";
import image1 from '@/assets/aboutUsField.png';
import image2 from '@/assets/aboutUsChicken.png';
import image3 from '@/assets/aboutUsCow.png';
import image4 from '@/assets/aboutUsSheep.png';
import ResuableTitleDescription from "@/components/shared/ResuableTitleDescription";

export default async function AboutUs() {
    return (
        <section
            id="about"
            className="w-full overflow-hidden bg-no-repeat h-[1225px]"
            style={{
                backgroundImage: `url(${image1.src})`,
                backgroundSize: 'cover',
                borderRadius: '500px 500px 0 0'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
                <div className="max-w-4xl mx-auto pt-10">
                    <ResuableTitleDescription
                        subTitle="ABOUT US"
                        subTitleClassName="inline-flex items-center gap-2 bg-sub-title-bg py-1.5 px-4 md:py-2 md:px-5 rounded-full border border-accent "
                        title="Who we are"
                        titleClassName="text-[56px] md:text-5xl font-bold font-display tracking-tight text-primary leading-[1.15] "
                        description="Our platform enables farmers to access veterinary care, book services from licensed veterinarians, receive AI-assisted health insights, and generate personalized livestock management content. Veterinarians can also use AI to create educational content, share expert knowledge, and provide digital consultations more efficiently."
                        descriptionClassName="text-description font-normal text-3xl md:text-2xl leading-relaxed"
                        align="center"
                    />
                </div>

                <div className="px-4 md:px-8  z-10 mt-36">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
                        <div
                            className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={image4}
                                alt="Farmer smiling holding a fluffy lamb"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>
                        <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl md:-translate-y-8 lg:-translate-y-12">
                            <Image
                                src={image3}
                                alt="Veterinarian examining cows inside a barn"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 30vw"
                            />
                        </div>

                        <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl md:translate-y-8 lg:translate-y-12">
                            <Image
                                src={image2}
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
