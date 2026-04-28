import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { posts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Amini",
  description:
    "Practical guides on Nigerian money transfers, bank fees, bill payments, and personal finance — written by the Amini team.",
  openGraph: {
    title: "Blog — Amini",
    description:
      "Practical guides on Nigerian money transfers, bank fees, bill payments, and personal finance.",
    type: "website",
  },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-12 border-b border-gray-200">
        <div className="container-width">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 mb-6">
              Amini Blog
            </div>
            <h1 className="text-gray-900 text-balance">
              Money guides for{" "}
              <span className="text-accent-500">modern Nigerians</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Practical, no-nonsense writing on transfers, bills, savings, and
              the small everyday things that quietly drain your wallet.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-16">
        <div className="container-width">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 transition-colors hover:border-gray-300"
          >
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
                Featured
              </span>
              <span>{featured.category}</span>
              <span>·</span>
              <span>{formatDate(featured.date)}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="mt-6 text-gray-900 group-hover:text-primary-700 transition-colors">
              {featured.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed max-w-3xl">
              {featured.excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Other posts */}
      {rest.length > 0 && (
        <section className="pb-24">
          <div className="container-width">
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-gray-200 bg-white p-8 transition-colors hover:border-gray-300"
                >
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 text-sm text-gray-500">
                    {formatDate(post.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
