import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts, formatDate } from "@/lib/blog";

export default function BlogPreview() {
  const latest = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-white border-t border-gray-200">
      <div className="container-width">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 mb-6">
              From the blog
            </div>
            <h2 className="text-balance text-gray-900">
              Money guides for{" "}
              <span className="text-accent-500">modern Nigerians</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Practical writing on transfers, bills, savings, and the small
              everyday things that quietly drain your wallet.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            All articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 font-medium text-gray-700">
                  {post.category}
                </span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 leading-snug group-hover:text-primary-700 transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(post.date)}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary-700">
                  Read
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
