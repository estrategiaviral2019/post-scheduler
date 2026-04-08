export default function Home() {
  return (
    <main className="main-container">
      <div className="glass-card" style={{ textAlign: "center", marginTop: "10vh" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✨ Post Scheduler</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
          Programa tus ideas para el futuro en X y Reddit de forma gratuita.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button className="btn-primary">Conectar X (Twitter)</button>
          <button className="btn-primary" style={{ backgroundColor: "#ff4500" }}>Conectar Reddit</button>
        </div>
      </div>
    </main>
  );
}
