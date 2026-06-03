export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-brand-500 border-t-transparent text-brand-600 animate-spin" />
    </div>
  );
}
