import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Ticker from "@/components/landing/Ticker";
import Spotlight from "@/components/landing/Spotlight";
import Features from "@/components/landing/Features";
import WhyAmini from "@/components/landing/WhyAmini";
import Audiences from "@/components/landing/Audiences";
import HowItWorks from "@/components/landing/HowItWorks";
import Safety from "@/components/landing/Safety";
import Reviews from "@/components/landing/Reviews";
import Faqs from "@/components/landing/Faqs";
import BlogPreview from "@/components/landing/BlogPreview";
import Download from "@/components/landing/Download";
import Footer from "@/components/landing/Footer";
import StructuredData from "@/components/StructuredData";
import { faqs } from "@/lib/faqs";
import {
  LEGAL_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_PROFILES,
  SUPPORT_EMAIL,
  absoluteUrl,
} from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

/**
 * Three graphs, one script each:
 *  - Organization, so the brand can be resolved as an entity.
 *  - MobileApplication, because the product is the app, not the page.
 *  - FAQPage, generated from the same data the accordion renders.
 */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: SITE_NAME,
  legalName: LEGAL_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/app-icon.png"),
  description: SITE_DESCRIPTION,
  email: SUPPORT_EMAIL,
  areaServed: { "@type": "Country", name: "Nigeria" },
  knowsLanguage: ["en", "ha"],
  sameAs: SOCIAL_PROFILES,
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en-NG",
  publisher: { "@id": absoluteUrl("/#organization") },
};

const application = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: SITE_NAME,
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  publisher: { "@id": absoluteUrl("/#organization") },
  inLanguage: ["en", "ha"],
  featureList: [
    "Automated savings plans",
    "Adashi group savings circles",
    "Instant wallet transfers",
    "Airtime, data and bill payments",
    "Biometric and PIN protection",
    "Hausa and English interface",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "NGN",
    description: "Free to download and open an account.",
  },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas-1">
      <StructuredData data={organization} />
      <StructuredData data={website} />
      <StructuredData data={application} />
      <StructuredData data={faqPage} />

      <Header />
      <Hero />
      <Ticker />
      <Spotlight />
      <Features />
      <WhyAmini />
      <Audiences />
      <HowItWorks />
      <Safety />
      <Reviews />
      <Faqs />
      <BlogPreview />
      <Download />
      <Footer />
    </main>
  );
}
