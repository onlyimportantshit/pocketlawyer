export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "16px",
          }}
        >
          Pocket Lawyer ⚖️
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            opacity: 0.9,
            marginBottom: "40px",
          }}
        >
          Your AI-powered legal assistant. Ask legal questions, understand
          documents, and get quick legal guidance instantly.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Ask a Legal Question
          </button>

          <button
            style={{
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "transparent",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Upload Legal Document
          </button>
        </div>

        <div
          style={{
            marginTop: "60px",
            opacity: 0.7,
            fontSize: "14px",
          }}
        >
          Built with Next.js • Powered by AI
        </div>
      </div>
    </main>
  );
}