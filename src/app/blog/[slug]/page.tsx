import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  getAllPostSlugs,
  getPostBySlug,
  formatDate,
  posts,
  type Block,
} from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Amini`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="mt-12 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="mt-8 text-xl font-semibold text-gray-900 tracking-tight"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-5 text-gray-700 leading-relaxed">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-5 space-y-2 list-disc pl-6 text-gray-700">
          {block.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mt-5 space-y-2 list-decimal pl-6 text-gray-700">
          {block.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-8 border-l-4 border-accent-500 bg-accent-50/40 px-6 py-4 italic text-gray-800"
        >
          {block.text}
        </blockquote>
      );
  }
}

export default function BlogPost({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Amini",
      logo: {
        "@type": "ImageObject",
        url: "/app-icon.png",
      },
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-32 pb-24">
        <div className="container-width">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                {post.category}
              </span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 text-gray-900 text-balance !text-3xl sm:!text-4xl md:!text-5xl lg:!text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-10 pt-10 border-t border-gray-200">
              {post.blocks.map((block, i) => renderBlock(block, i))}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Ready to stop paying transfer fees?
              </h3>
              <p className="mt-2 text-gray-600">
                Amini gives you free instant transfers, bill payments at no
                markup, and a dedicated virtual account — all in one app.
              </p>
              <Link
                href="/#download"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Get the app
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-gray-200 py-16 bg-gray-50">
          <div className="container-width">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">
                Keep reading
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group block rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
