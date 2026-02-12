import { SpaceCanvas } from "./components/SpaceCanvas";
import { ScrollShowcase } from "./components/ScrollShowcase";
import { Hero } from "./sections/Hero";

export default function App() {
  return (
    <>
      <SpaceCanvas />

      <main className="relative z-10">
        <Hero />
        <article>
          <ScrollShowcase />
        </article>

        <footer className="py-8 sm:py-12 text-center text-white/20 text-xs sm:text-sm px-4">
          © {new Date().getFullYear()} 0xMemo · Built with passion
        </footer>
      </main>
    </>
  );
}
