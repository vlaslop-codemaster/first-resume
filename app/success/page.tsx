export default function Success() {
  return (
    <main style={{ minHeight: "100vh", background: "#f5f4ff", fontFamily: "'Segoe UI', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #e5e7eb", padding: "3rem 2rem", textAlign: "center", maxWidth: "460px", margin: "1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem", color: "#111", marginBottom: "0.75rem" }}>Payment successful!</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "2rem" }}>Your full resume has been unlocked. Go back and copy it!</p>
        <a href="/" style={{ background: "#7c3aed", color: "#fff", borderRadius: "10px", padding: "14px 32px", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}>
          Back to my resume →
        </a>
      </div>
    </main>
  );
}