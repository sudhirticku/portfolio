import Link from "next/link";
import { Nav } from "@/components/shared/Nav";
import { FooterCta } from "@/components/home/FooterCta";
import { getPosts } from "@/lib/notion/blog";

export const revalidate = 3600;
export const metadata = { title: "Blog — RecruAIter" };

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm text-[var(--muted)]">Blog</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Notes from the desk, not the demo.
        </h1>

        {posts.length === 0 ? (
          <p className="mt-12 text-lg text-[var(--muted)]">
            First post is on its way. Check back soon.
          </p>
        ) : (
          <ul className="mt-14 divide-y divide-[var(--line)]">
            {posts.map((post) => (
              <li key={post.id} className="py-8 first:pt-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-wrap gap-x-3 text-sm text-[var(--muted)]">
                    {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
                    {post.readTime && <span>{post.readTime}</span>}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight group-hover:text-[var(--accent)]">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-prose leading-relaxed text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--line)] px-2.5 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <FooterCta />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
