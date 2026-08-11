import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StructuredData from "@/components/StructuredData";
import { posts, formatDate } from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const DESCRIPTION =
  "Practical guides on saving in Nigeria — Adashi and group savings, daily savings for traders, transfer fees, bill payments and personal finance. Written by the Amini team.";

export const metadata: Metadata = {
  title: "Blog — money guides for Nigeria",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description: DESCRIPTION,
    type: "website",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [featured, ...rest] = sorted;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: `${SITE_NAME} Blog`,
    description: DESCRIPTION,
    url: absoluteUrl("/blog"),
    inLanguage: "en-NG",
    publisher: { "@id": absoluteUrl("/#organization") },
    blogPost: sorted.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: absoluteUrl(`/blog/${post.slug}`),
      author: { "@type": "Organization", name: post.author },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  return (
    <main className="min-h-screen bg-canvas-1">
      <StructuredData data={blogLd} />
      <StructuredData data={breadcrumbs} />

      <Header />

      <section className="border-b border-line-1 pb-12 pt-16">
        <div className="container-width">
          <div className="max-w-3xl">
            <h1 className="text-balance text-ink-1">
              Money guides for modern Nigerians
            </h1>
            <p className="mt-6 text-body-lg text-ink-2">
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
            className="group block rounded-xl border border-line-1 bg-canvas-1 p-8 transition-colors duration-base ease-standard hover:border-line-2 hover:bg-canvas-2 sm:p-12"
          >
            <div className="flex flex-wrap items-center gap-3 text-body-sm text-ink-3">
              <span className="inline-flex items-center rounded-md bg-accent-panel px-3 py-1 font-medium text-ink-1">
                Featured
              </span>
              <span>{featured.category}</span>
              <span>·</span>
              <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <h2 className="mt-6 text-ink-1 transition-colors duration-base ease-standard group-hover:text-accent-2">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-3xl text-body-lg text-ink-2">
              {featured.excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-accent-2">
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
                  className="group block rounded-xl border border-line-1 bg-canvas-1 p-8 transition-colors duration-base ease-standard hover:border-line-2 hover:bg-canvas-2"
                >
                  <div className="flex items-center gap-3 text-body-sm text-ink-3">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 text-body-lg font-semibold text-ink-1 transition-colors duration-base ease-standard group-hover:text-accent-2">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-body-md text-ink-2">
                    {post.excerpt}
                  </p>
                  <time
                    dateTime={post.date}
                    className="mt-6 block text-body-sm text-ink-3"
                  >
                    {formatDate(post.date)}
                  </time>
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
