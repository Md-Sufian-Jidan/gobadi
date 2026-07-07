import Image from "next/image";
import hero_cow from "@/assets/gobadi_hero_image-1.webp";

export default function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-20 lg:py-28 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8 z-10">
            <div className="inline-flex items-center gap-2 self-start bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
              <span className="text-xs font-bold font-display uppercase tracking-widest text-accent">
                Cattle Management Ecosystem
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.05] tracking-tight text-foreground">
                Smarter cattle care for <br />
                <span className="text-accent underline decoration-accent-light decoration-4 underline-offset-8">
                  healthier herds.
                </span>
              </h1>
              <p className="text-lg text-foreground/80 font-sans max-w-xl leading-relaxed">
                Empowering farmers and dairy owners with real-time health analytics, breed tracking, and diagnostic insights. Step into the future of dairy operations and livestock management.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#stay-tuned" 
                className="bg-accent text-background hover:bg-accent/90 px-8 py-4 rounded-2xl font-bold font-display tracking-wide text-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 duration-200"
              >
                Join Waitlist
              </a>
              <a 
                href="#about" 
                className="border-2 border-foreground/30 hover:border-foreground/80 text-foreground hover:bg-foreground/5 px-8 py-4 rounded-2xl font-bold font-display tracking-wide text-center transition-all duration-200"
              >
                Learn More
              </a>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-accent-light/40">
              <div>
                <p className="text-3xl font-bold font-display text-accent">98%</p>
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider font-sans mt-1">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-display text-accent">10k+</p>
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider font-sans mt-1">Cattle Registered</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-display text-accent">24/7</p>
                <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wider font-sans mt-1">Health Monitoring</p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            {/* Background design accents */}
            <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-accent-light/30 blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl -z-10" />
            
            {/* Main Image Container */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-square md:aspect-[4/5] rounded-[2.5rem] p-4 bg-accent-light/20 border border-accent-light/40 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent z-10 pointer-events-none" />
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image 
                  src={hero_cow} 
                  alt="Gobadi Cattle Management" 
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-4 right-4 bg-background border border-accent-light/40 shadow-xl rounded-2xl p-4 flex items-center gap-3 z-20 animate-bounce-slow">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div>
                <p className="text-xs text-foreground/60 font-semibold uppercase">Status</p>
                <p className="text-sm font-bold text-foreground">Herd Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}