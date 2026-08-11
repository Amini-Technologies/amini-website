import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts, formatDate } from "@/lib/blog";

export default function BlogPreview() {
  const latest = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-canvas-tint">
      <div className="container-width">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-ink-1">Money guides for modern Nigerians</h2>
            <p className="mt-5 text-body-lg text-ink-2">
              Practical writing on saving, Adashi, transfers, and the small
              everyday things that quietly drain a wallet.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-body-sm font-medium text-accent-2 transition-colors duration-base ease-standard hover:text-accent-1"
          >
            All articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl bg-canvas-1 p-6 transition-colors duration-base ease-standard hover:bg-accent-surface"
            >
              <div className="flex items-center gap-3 text-body-sm text-ink-3">
                <span className="rounded-md bg-accent-surface px-3 py-1 text-ink-2 transition-colors duration-base ease-standard group-hover:bg-accent-panel">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mt-5 text-body-lg font-semibold leading-snug text-ink-1">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-body-sm text-ink-2">{post.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-body-sm text-ink-3">
                <span>{formatDate(post.date)}</span>
                <span className="inline-flex items-center gap-1 font-medium text-accent-2">
                  Read
                  <ArrowRight className="h-3 w-3 transition-transform duration-base ease-standard group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
