"use client";

import DashboardShell from "@/components/common/DashboardShell";
import ContentFeed from "@/components/feed/ContentFeed";

export default function DashboardFeedPage() {
  return (
    <DashboardShell title="Feed" description="Your latest personalized content, refreshed automatically.">
      <ContentFeed />
    </DashboardShell>
  );
}
