"use client";

import type { ReactNode } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";

interface DashboardShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function DashboardShell({ title, description, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <Sidebar />
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-brand-600">{title}</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{title} Overview</h2>
              </div>
              {description ? <p className="max-w-xl text-sm text-slate-600 dark:text-slate-400">{description}</p> : null}
            </div>
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}
