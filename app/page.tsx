import { Nav } from "@/components/shared/Nav";
import { Hero } from "@/components/home/Hero";
import { WhoFor } from "@/components/home/WhoFor";
import { Why } from "@/components/home/Why";
import { Builds, type Build } from "@/components/home/Builds";
import { About } from "@/components/home/About";
import { FooterCta } from "@/components/home/FooterCta";
import { getProjects } from "@/lib/notion";

export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getProjects().catch(() => []);
  const items: Build[] = projects.map((p) => ({
    id: p.id,
    title: p.name,
    summary: p.tagline,
  }));

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhoFor />
        <Why />
        <Builds items={items} />
        <About />
      </main>
      <FooterCta />
    </>
  );
}
