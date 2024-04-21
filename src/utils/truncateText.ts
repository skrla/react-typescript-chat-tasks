export default function truncate(text: string) {
  return text.length > 30 ? text.substring(0, 30) + "..." : text;
}
