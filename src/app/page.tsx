import Experience from "@/components/Experience";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="bg-luxury-black min-h-screen">
      <Header />
      <Experience />
      
      {/* Additional space to scroll past the experience if needed, 
          or footer section. For now just some padding to ensure smooth ending. */}
      <div className="h-[50vh] bg-luxury-black flex items-center justify-center text-luxury-muted font-light tracking-[0.2em] text-sm uppercase">
        Explore Collection
      </div>
    </main>
  );
}
