import type { Metadata } from "next";
import AdminShell from "./AdminShell";

/**
 * Server layout so the admin tree can carry a robots directive. robots.txt
 * already disallows /admin, but a disallowed URL can still be indexed without
 * content — the meta tag is what actually keeps it out of results.
 */
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
