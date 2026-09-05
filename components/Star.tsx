export default function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M44 0h12l1 32 23-23 9 9-22 24 33 2v12l-33 2 22 24-9 9-23-23-1 32H44l-1-32-23 23-9-9 22-24-33-2V44l33-2L11 18l9-9 23 23z" />
    </svg>
  );
}
