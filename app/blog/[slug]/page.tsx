import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Nav } from "@/components/shared/Nav";
import { FooterCta } from "@/components/home/FooterCta";
import { getPostBySlug, getPosts } from "@/lib/notion/blog";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  return data
    ? { title: `${data.post.title} — RecruAIter`, description: data.post.excerpt }
    : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (!data) notFound();
  const { post, markdown } = data;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link href="/blog" className="text-sm text-[var(--muted)] hover:text-[var(--ink)]">
          ← All posts
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
        <div className="mt-4 flex gap-3 text-sm text-[var(--muted)]">
          {post.date && <time dateTime={post.date}>{new Date(post.date).toDateString()}</time>}
          {post.readTime && <span>{post.readTime}</span>}
        </div>

        <article className="prose prose-lg mt-12 max-w-none prose-headings:tracking-tight prose-a:text-[var(--accent)]">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </main>
      <FooterCta />
    </>
  );
}
