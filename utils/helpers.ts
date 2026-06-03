export function getReadableDate(timestamp?: string) {
  if (!timestamp) return "Unknown date";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function truncateText(value: string, maxLength = 120) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength)}...`;
}

export function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}
