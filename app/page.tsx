import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Hackathon Components</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Select a page to test components:
      </p>

      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link
          href="/dashboard"
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            maxWidth: "200px",
            textAlign: "center",
          }}
        >
          Dashboard
        </Link>

        <Link
          href="/login"
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            maxWidth: "200px",
            textAlign: "center",
          }}
        >
          Login
        </Link>

        <Link
          href="/register"
          style={{
            padding: "1rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            maxWidth: "200px",
            textAlign: "center",
          }}
        >
          Register
        </Link>
      </nav>
    </div>
  );
}
