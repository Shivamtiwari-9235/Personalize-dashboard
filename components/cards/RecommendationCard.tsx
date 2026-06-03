import type { RecommendationItem } from "@/types/content";
import { truncateText } from "@/utils/helpers";

interface RecommendationCardProps {
  item: RecommendationItem;
  onToggleFavorite: () => void;
  favorited: boolean;
}

export default function RecommendationCard({ item, onToggleFavorite, favorited }: RecommendationCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium text-brand-600">Recommendation</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {item.category}
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{truncateText(item.description, 120)}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-brand-700 transition hover:text-brand-900 dark:text-brand-300"
          >
            Open resource →
          </a>
          <button
            type="button"
            onClick={onToggleFavorite}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            {favorited ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
