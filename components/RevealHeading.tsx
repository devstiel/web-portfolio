import type { ReactNode } from "react";

/** Explicit lines preserve the accessible heading without runtime text splitting. */
export default function RevealHeading({
  first,
  second,
  id,
}: {
  first: ReactNode;
  second: ReactNode;
  id?: string;
}) {
  return (
    <h2 id={id} data-reveal="heading">
      <span className="reveal-mask">
        <span data-reveal-line>{first}</span>
      </span>{" "}
      <span className="reveal-mask">
        <em data-reveal-line>{second}</em>
      </span>
    </h2>
  );
}
