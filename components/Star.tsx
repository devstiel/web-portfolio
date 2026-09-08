export default function Star({
  className = "",
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={starPath} />
    </svg>
  );
}
import { starPath } from "@/data/starShape";
