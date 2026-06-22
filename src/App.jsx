function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.logo}>TIU</div>
          <div style={styles.school}>Toshofu International University</div>
        </div>
        <button style={styles.headerButton}>Student Sign In</button>
      </header>

      <main style={styles.hero}>
        <div style={styles.card}>
          <p style={styles.label}>Official Student Portal</p>
          <h1 style={styles.title}>
            Toshofu International University
          </h1>
          <p style={styles.subtitle}>
            Access academic information, campus notices, assignments, and student services.
          </p>

          <div style={styles.form}>
            <input style={styles.input} placeholder="Student ID or Email" />
            <input style={styles.input} type="password" placeholder="Password" />
            <button style={styles.loginButton}>Sign In</button>
          </div>

          <p style={styles.note}>
            For authorized students, faculty, and staff only.
          </p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f6f8fb 0%, #e9eef5 100%)",
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: "#0b2341",
  },
  header: {
    height: "72px",
    padding: "0 56px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #d7dee8",
    backgroundColor: "white",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#0b2341",
    letterSpacing: "2px",
  },
  school: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "4px",
  },
  headerButton: {
    padding: "10px 18px",
    border: "1px solid #b08d2f",
    backgroundColor: "white",
    color: "#0b2341",
    borderRadius: "4px",
    cursor: "pointer",
  },
  hero: {
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  card: {
    width: "560px",
    backgroundColor: "white",
    padding: "56px",
    borderRadius: "8px",
    boxShadow: "0 20px 50px rgba(11, 35, 65, 0.12)",
    borderTop: "6px solid #b08d2f",
  },
  label: {
    fontSize: "13px",
    color: "#b08d2f",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "38px",
    lineHeight: "1.2",
    margin: "12px 0 16px",
  },
  subtitle: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#4b5563",
    marginBottom: "32px",
  },
  form: {
    display: "grid",
    gap: "14px",
  },
  input: {
    padding: "14px",
    fontSize: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
  },
  loginButton: {
    padding: "14px",
    fontSize: "15px",
    fontWeight: "bold",
    backgroundColor: "#0b2341",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  note: {
    marginTop: "20px",
    fontSize: "13px",
    color: "#6b7280",
  },
};

export default App;