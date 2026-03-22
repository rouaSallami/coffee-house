export default function SkeletonBlock({
  className = "",
  rounded = "rounded-2xl",
}) {
  return (
    <div
      className={`animate-pulse bg-dark/10 ${rounded} ${className}`}
    />
  );
}