import Experience from "@/components/Experience";
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
      <Experience />
      <AboutSection />
      <Features />
      <TrendingProducts />
      <Testimonials />
      <Marquee />
      <Footer />
    </main>
  );
}
