import Nav from "@/components/Nav";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Nav />
      <div className="pt-16">{children}</div>
    </div>
  );
}
