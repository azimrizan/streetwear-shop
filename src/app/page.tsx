import BannerSection from "@/components/BannerSection";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Features from "@/components/Features";
import TrendingProducts from "@/components/TrendingProducts";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-luxury-black min-h-screen">
      <Header />
      <BannerSection />
      <HeroSection />
      <AboutSection />
      <Features />
      <TrendingProducts />
      <Testimonials />
      <Marquee />
      <Footer />
    </main>
  );
}
