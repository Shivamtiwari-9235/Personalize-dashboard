import type { NewsArticle } from "@/types/content";
import { getReadableDate, truncateText } from "@/utils/helpers";

interface NewsCardProps {
  article: NewsArticle;
  onToggleFavorite: () => void;
  favorited: boolean;
}

export default function NewsCard({ article, onToggleFavorite, favorited }: NewsCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-brand-600">
          <span>{article.source}</span>
          <span className="text-slate-400">•</span>
          <span>{getReadableDate(article.publishedAt)}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{article.title}</h3>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{truncateText(article.description, 110)}</p>
        <div className="flex items-center justify-between gap-4">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-brand-700 transition hover:text-brand-900 dark:text-brand-300"
          >
            Read full story →
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
