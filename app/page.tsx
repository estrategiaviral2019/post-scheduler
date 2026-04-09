"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !date) return alert("Por favor llena todos los campos.");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, scheduledAt: date, platform })
      });
      if (res.ok) {
        alert("¡Publicación programada exitosamente!");
        setContent("");
        setDate("");
      } else {
        alert("Hubo un error al guardar la programación.");
      }
    } catch {
      alert("Fallo de red.");
    }
    setIsSubmitting(false);
  };

  if (status === "loading") {
    return <main className="main-container"><p>Cargando sesión...</p></main>;
  }

  if (!session) {
    return (
      <main className="main-container">
        <div className="glass-card" style={{ textAlign: "center", marginTop: "10vh" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✨ Post Scheduler</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
            Programa tus ideas para el futuro en X y Reddit.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button className="btn-primary" onClick={() => signIn('twitter')}>Conectar X (Twitter)</button>
            <button className="btn-primary" onClick={() => signIn('reddit')} style={{ backgroundColor: "#ff4500" }}>Conectar Reddit</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Dashboard Mágico ⚡</h2>
        <button onClick={() => signOut()} className="btn-primary" style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
          Cerrar Sesión
        </button>
      </div>

      <div className="glass-card">
        <h3>Programar nueva publicación</h3>
        <form onSubmit={handleSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={{ padding: '0.8rem', borderRadius: '8px', background: 'var(--surface-color)', color: 'white', border: '1px solid var(--border-color)' }}>
            <option value="twitter">X (Twitter)</option>
            <option value="reddit">Reddit</option>
          </select>

          <textarea 
            placeholder="¿Qué quieres contarle al mundo?" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: '1rem', minHeight: '120px', borderRadius: '8px', background: 'var(--surface-color)', color: 'white', border: '1px solid var(--border-color)', resize: 'vertical', fontSize: '1rem' }}
          />

          <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Selecciona el día y la hora de publicación:</label>
          <input 
            type="datetime-local" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: '0.8rem', borderRadius: '8px', background: 'var(--surface-color)', color: 'white', border: '1px solid var(--border-color)', colorScheme: 'dark' }}
          />

          <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            {isSubmitting ? "Guardando..." : "Dejar Programado 🕒"}
          </button>
        </form>
      </div>
    </main>
  );
}
