"use client";

import Link from "next/link";
import DashboardShell from "@/components/common/DashboardShell";

export default function DashboardHomePage() {
  return (
    <DashboardShell title="Dashboard" description="Your personalized content hub with feed, trending stories, and saved favorites.">
      <div className="grid gap-6 xl:grid-cols-3">
        {[
          {
            label: "View feed",
            description: "Browse news, insights, and social content curated for you.",
            href: "/dashboard/feed",
          },
          {
            label: "Trending now",
            description: "Check what’s generating buzz across the platform.",
            href: "/dashboard/trending",
          },
          {
            label: "Favorites",
            description: "Review and manage the content you’ve saved.",
            href: "/dashboard/favorites",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{card.label}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
            <span className="mt-6 inline-flex text-sm font-semibold text-brand-700 dark:text-brand-300">Open →</span>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
