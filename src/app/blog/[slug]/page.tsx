import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import StructuredData from "@/components/StructuredData";
import {
  getAllPostSlugs,
  getPostBySlug,
  formatDate,
  posts,
  type Block,
} from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
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
          className="mt-12 text-display-xs font-bold text-ink-1"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="mt-8 text-body-lg font-semibold text-ink-1"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-6 text-body-md text-ink-2">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-6 list-disc space-y-2 pl-6 text-body-md text-ink-2">
          {block.items.map((item, j) => (
            <li key={j} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mt-6 list-decimal space-y-2 pl-6 text-body-md text-ink-2">
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
          className="mt-8 rounded-r-lg border-l-2 border-accent-2 bg-accent-surface px-6 py-4 text-body-md italic text-ink-1"
        >
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  /* Prefer posts in the same category — a related link that shares intent is
     worth more to a reader (and to a crawler) than the next one in the list. */
  const others = posts.filter((p) => p.slug !== post.slug);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 2);

  const url = absoluteUrl(`/blog/${post.slug}`);
  const wordCount = post.blocks.reduce((total, block) => {
    const text = "items" in block ? block.items.join(" ") : block.text;
    return total + text.split(/\s+/).length;
  }, 0);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    wordCount,
    inLanguage: "en-NG",
    image: [absoluteUrl(`/blog/${post.slug}/opengraph-image`)],
    author: {
      "@type": "Organization",
      name: post.author,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/app-icon.png"),
      },
    },
    keywords: post.keywords.join(", "),
    isPartOf: { "@id": absoluteUrl("/blog#blog") },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-canvas-1">
      <Header />

      <StructuredData data={articleLd} />
      <StructuredData data={breadcrumbs} />

      <article className="pb-24 pt-16">
        <div className="container-width">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Breadcrumb">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-body-sm text-ink-3 transition-colors duration-base ease-standard hover:text-ink-1"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to blog
              </Link>
            </nav>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-body-sm text-ink-3">
              <span className="inline-flex items-center rounded-md bg-accent-panel px-3 py-1 text-ink-1">
                {post.category}
              </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 text-balance text-ink-1 lg:text-display-md">
              {post.title}
            </h1>

            <p className="mt-6 text-body-lg text-ink-2">
              {post.excerpt}
            </p>

            <div className="mt-8 border-t border-line-1 pt-8">
              {post.blocks.map((block, i) => renderBlock(block, i))}
            </div>

            {/* CTA */}
            <div className="mt-16 rounded-xl bg-accent-panel p-8">
              <h2 className="!text-body-lg font-semibold text-ink-1">
                Put the habit on autopilot
              </h2>
              <p className="mt-2 text-body-md text-ink-2">
                Amini runs your savings plan on schedule, keeps an Adashi circle
                honest, and moves money between users for free — in Hausa or
                English.
              </p>
              <Link href="/#download" className="btn-pill mt-6">
                Get the app
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line-1 bg-canvas-2 py-16">
          <div className="container-width">
            <div className="max-w-5xl mx-auto">
              <h2 className="!text-display-xs text-ink-1">
                Keep reading
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group block rounded-xl border border-line-1 bg-canvas-1 p-6 transition-colors duration-base ease-standard hover:border-line-2"
                  >
                    <div className="flex items-center gap-3 text-body-sm text-ink-3">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="mt-3 text-body-lg font-semibold text-ink-1 transition-colors duration-base ease-standard group-hover:text-accent-2">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-ink-2">
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
