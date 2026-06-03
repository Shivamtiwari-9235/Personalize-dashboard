import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 font-sans min-h-screen">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-20 px-16">
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            Welcome to Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Personalized Content Dashboard
            </span>
          </h1>

          <p className="max-w-2xl text-xl leading-8 text-slate-600 dark:text-slate-300">
            Discover personalized news, trending content, and your favorite posts all in one place.
            Customize your preferences and enjoy a tailored experience.
          </p>

          <div className="flex gap-4 flex-wrap justify-center pt-8">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/settings"
              className="px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Settings
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">📰 News Feed</h3>
              <p className="text-slate-600 dark:text-slate-300">Stay updated with latest news from your favorite categories</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">🔥 Trending</h3>
              <p className="text-slate-600 dark:text-slate-300">Discover what's trending across different categories</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">❤️ Favorites</h3>
              <p className="text-slate-600 dark:text-slate-300">Save and manage your favorite content in one place</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
