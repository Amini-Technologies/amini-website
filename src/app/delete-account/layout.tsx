import type { Metadata } from "next";

/**
 * The page itself is a client component, so its metadata lives here. This URL
 * is the public account-deletion route the app stores require, so it stays
 * indexable and canonical.
 */
export const metadata: Metadata = {
  title: "Delete your account and data",
  description:
    "Request permanent deletion of your Amini account and the personal data associated with it.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
