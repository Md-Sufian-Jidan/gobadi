import Image from "next/image";
import gobadi_logo from "@/assets/gobadi_logo.webp";
import hero_cow_portrait from "@/assets/hero_cow_portrait.png";
import coming_soon_app from "@/assets/coming_soon_app.png";
import gobadi_hero_image from "@/assets/gobadi_hero_image-1.webp";
import { LuRocket } from "react-icons/lu";

export default function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-16 lg:py-20 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          
          {/* 1. Top-Left Box: Title & Text (Col span 7) */}
          <div className="col-span-12 lg:col-span-7 bg-white rounded-[32px] border border-accent/10 p-8 sm:p-12 lg:p-14 flex flex-col justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[400px] shadow-sm relative overflow-hidden group">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-[62px] lg:text-[70px] leading-[1.08] tracking-tight uppercase">
              Where <span className="text-accent">Livestock</span> <br />
              Meets <br />
              <span className="text-accent">Intelligence.</span>
            </h1>
          </div>

          {/* 2. Top-Right Box: Cow Image Card (Col span 5) */}
          <div className="col-span-12 lg:col-span-5 bg-[#C86433] rounded-[32px] min-h-[320px] sm:min-h-[380px] lg:min-h-[400px] overflow-hidden relative shadow-sm group">
            <Image 
              src={hero_cow_portrait} 
              alt="Gobadi Cow Portrait" 
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
            />
          </div>

          {/* 3. Bottom-Left stacked column (Col span 3) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-6">
            
            {/* Stay Tuned Card */}
            <div className="bg-[#B35320] rounded-[32px] p-8 flex flex-col justify-center min-h-[160px] md:flex-1 shadow-sm relative overflow-hidden group">
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#171717] tracking-tight uppercase leading-none">STAY</span>
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#171717] tracking-tight uppercase leading-none mt-2">Tuned...</span>
            </div>

            {/* Launch Card */}
            <div className="bg-white rounded-[32px] border border-accent/10 p-6 flex flex-col justify-between min-h-[120px] shadow-sm relative overflow-hidden">
              <span className="text-xs font-bold text-slate-400 font-display uppercase tracking-wider">We are near to:</span>
              <h4 className="text-3xl font-extrabold text-[#C1652F] font-display flex items-center gap-2 mt-2 leading-none">
                <span>Launch</span>
                <LuRocket className="w-7 h-7 text-[#C1652F] animate-bounce" />
              </h4>
            </div>

          </div>

          {/* 4. Bottom-Middle Box: Hand holding phone (Col span 3) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-[#B35320] rounded-[32px] min-h-[290px] md:min-h-auto overflow-hidden relative shadow-sm group">
            <Image 
              src={coming_soon_app} 
              alt="Gobadi Mobile Application" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
            />
          </div>

          {/* 5. Bottom-Right Box: Description & Cows (Col span 6) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-6 bg-white rounded-[32px] border border-accent/10 overflow-hidden flex flex-col justify-between min-h-[290px] md:min-h-auto shadow-sm relative">
            <p className="text-[#171717] text-center font-semibold text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto pt-8 px-6">
              AI-powered digital platform transforming the livestock eco-system by connecting farmers, veterinarians, and also trusted providers in one place.
            </p>
            <div className="relative w-full h-[150px] sm:h-[180px] lg:h-[150px] overflow-hidden mt-6">
              <Image 
                src={gobadi_hero_image} 
                alt="Cattle on pasture" 
                fill
                className="object-cover" 
              />
            </div>
          </div>

          {/* Central Logo Overlay (Desktop Only) */}
          <div className="absolute z-20 w-44 h-44 rounded-full bg-white border-[3px] border-accent flex flex-col items-center justify-center p-1.5 shadow-xl top-[53%] left-[58.33%] -translate-x-1/2 -translate-y-1/2 lg:flex hidden">
            <div className="w-full h-full rounded-full border border-accent/40 flex flex-col items-center justify-center bg-[#FFF6F3]/50">
              <div className="relative w-14 h-14">
                <Image
                  src={gobadi_logo}
                  alt="Gobadi Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-bengali font-bold text-[28px] text-primary leading-none mt-1.5">গবাদি</h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}