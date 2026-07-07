import AboutUs from "@/components/module/home/AboutUs";
import ComingSoon from "@/components/module/home/ComingSoon";
import ContactUs from "@/components/module/home/ContactUs";
import Hero from "@/components/module/home/Hero";
import OurVission from "@/components/module/home/OurVission";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <OurVission />
      <AboutUs />
      <ComingSoon />
      <ContactUs />
      <Footer />
    </main>
  );
}
