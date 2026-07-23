import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Catalogue } from "@/components/site/Catalogue";
import { Customization } from "@/components/site/Customization";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Santo Veste — Custom & Ready-to-Wear Apparel" },
      {
        name: "description",
        content:
          "Santo Veste crafts ready-to-wear and custom-fitted unisex clothing — tees, polos, hoodies, jerseys, uniforms, scrubs, jackets and more. Premium tailoring for individuals, teams and bulk orders.",
      },
      { property: "og:title", content: "Santo Veste — Custom & Ready-to-Wear Apparel" },
      {
        property: "og:description",
        content:
          "Ready-to-wear and custom-fitted unisex clothing. Twelve product categories, in-house printing and embroidery, MOQ from 30 pieces.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        <Catalogue />
        <Customization />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}
