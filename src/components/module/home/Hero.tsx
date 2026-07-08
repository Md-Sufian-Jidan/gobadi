import Image from 'next/image'
import heroCard from '@/assets/hero_card.png'
import rocket_icon from "@/assets/rocket.gif";
import heroTextOverCow from "@/assets/herotextovercowbg.png";
import gobadiLogo from "@/assets/hero_gobadi_logo.png";
import heroShape from '@/assets/hero_shape_1.png'
import heroShape2 from '@/assets/hero_shape_2.png'
import heroCow from '@/assets/herocow.png';

export default function Hero() {
    return (
        <section
            aria-label="Gobadi hero"
            className="relative mx-auto max-w-[1312px] px-4 sm:px-6 lg:px-0"
        >
            <div className="space-y-4 lg:space-y-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                    <div className="relative grid flex-[1.6] grid-cols-1 grid-rows-1">
                        <Image
                            src={heroShape}
                            alt=""
                            priority
                            className="col-start-1 row-start-1 h-full w-full rounded-[32px] object-cover"
                            sizes="(min-width: 1024px) 60vw, 100vw"
                        />
                        <div className="relative col-start-1 row-start-1 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                            <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2rem,4.5vw,4.5rem)]">
                                <span className="text-primary">Where</span>{" "}
                                <span className="text-accent">Livestock</span>
                                <br />
                                <span className="text-primary">Meets</span>
                                <br />
                                <span className="text-accent">Intelligence.</span>
                            </h1>
                        </div>
                    </div>

                    {/* right: cow shot */}
                    <div className="relative grid flex-1 grid-cols-1 grid-rows-1 overflow-hidden rounded-[32px]">
                        <Image
                            src={heroShape2}
                            alt=""
                            className="col-start-1 row-start-1 h-full w-full object-cover"
                            sizes="(min-width: 1024px) 32vw, 100vw"
                        />
                        <Image
                            src={heroCow}
                            alt="Cow standing for the Gobadi livestock platform"
                            className="col-start-1 row-start-1 h-full w-full object-contain object-bottom"
                            sizes="(min-width: 1024px) 32vw, 100vw"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                    {/* stay tuned + launch stack */}
                    <div className="flex flex-col gap-4 sm:gap-6 lg:w-[27%]">
                        <div className="flex min-h-[220px] flex-1 flex-col justify-center rounded-[30px] bg-accent p-6 sm:min-h-[280px]">
                            <h2 className="font-display font-extrabold uppercase leading-[1.1] text-[clamp(2rem,4vw,4rem)]">
                                <span className="text-black">STAY</span>
                                <br />
                                <span className="text-white">Tuned...</span>
                            </h2>
                        </div>

                        <div className="bg-white rounded-[40px] border border-border p-6 relative flex flex-col justify-center h-[162px] shadow-sm">
                            <span className="text-[24px] font-semibold text-primary uppercase tracking-wide">
                                We are near to:
                            </span>
                            <h2 className="text-[88px] font-black text-accent leading-none z-10">
                                Launch
                            </h2>
                            <Image
                                src={rocket_icon}
                                alt="Rocket icon"
                                unoptimized
                                className="h-32 w-32 absolute top-0 -right-9 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    {/* phone mockup */}
                    <div className="relative lg:w-[22%]">
                        <Image
                            src={heroCard}
                            alt="Gobadi mobile app shown on a smartphone"
                            className="h-full w-full rounded-[30px] object-cover"
                            sizes="(min-width: 1024px) 22vw, 100vw"
                        />
                    </div>

                    {/* AI copy over cow herd */}
                    <div className="relative grid flex-1 grid-cols-1 grid-rows-1">
                        <Image
                            src={heroTextOverCow}
                            alt=""
                            className="col-start-1 row-start-1 h-full w-full rounded-[30px] object-cover"
                            sizes="(min-width: 1024px) 32vw, 100vw"
                        />
                        <p className="relative col-start-1 row-start-1 self-start px-8 pt-8 text-center text-[32px] font-bold text-primary sm:pt-12 md:text-xl lg:text-2xl z-50 leading-[1.2]">
                            <span className='pl-56'>AI-powered digital platform</span> <br />
                            <span className='pl-50'>transforming the livestock</span> <br />
                            <span className='pl-44'>eco-system by connecting</span> <br />
                            <span className='pl-38'>farmers, veterinarians, and also</span> <br />
                            <span className='pl-28'>trusted providers in one place.</span>
                        </p>
                    </div>
                </div>

                <div className="absolute z-30 w-80 h-80 rounded-full bg-white border-[6px] border-accent flex items-center justify-center shadow-2xl top-[51%] left-[51%] -translate-x-1/2 -translate-y-1/2">
                    <Image
                        src={gobadiLogo}
                        alt="Gobadi icon"
                        className="h-full w-full rounded-full object-contain"
                    />
                </div>

            </div>
        </section>
    )
}