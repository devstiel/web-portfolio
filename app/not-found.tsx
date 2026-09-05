import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="shell" style={{ paddingBlock: "100px" }}>
        <p className="eyebrow">404 / A small detour</p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(44px, 8vw, 90px)",
            fontWeight: 400,
            lineHeight: 1.1,
            marginBlock: "25px",
          }}
        >
          Nothing here just yet.
        </h1>
        <p style={{ color: "var(--muted)", marginBottom: "30px" }}>
          The page you’re looking for doesn’t exist. Let’s get you back to the
          work.
        </p>
        <Link className="pill-link" href="/#work">
          Back to selected work <span aria-hidden="true">↗</span>
        </Link>
      </main>
    </>
  );
}
