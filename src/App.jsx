import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return <Login onLogin={() => setIsLoggedIn(true)} />;
}

function Login({ onLogin }) {
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
          <h1 style={styles.title}>Toshofu International University</h1>
          <p style={styles.subtitle}>
            Access academic information, campus notices, assignments, and student services.
          </p>

          <div style={styles.form}>
            <input style={styles.input} placeholder="Student ID or Email" />
            <input style={styles.input} type="password" placeholder="Password" />
            <button style={styles.loginButton} onClick={onLogin}>
              Sign In
            </button>
          </div>

          <p style={styles.note}>For authorized students, faculty, and staff only.</p>
        </div>
      </main>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={styles.dashboardPage}>
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>TIU</div>
        <div style={styles.sidebarTitle}>Student Portal</div>

        <nav style={styles.nav}>
          <div style={styles.navActive}>Dashboard</div>
          <div style={styles.navItem}>Notices</div>
          <div style={styles.navItem}>Assignments</div>
          <div style={styles.navItem}>Schedule</div>
          <div style={styles.navItem}>Academic Record</div>
        </nav>
      </aside>

      <main style={styles.dashboardMain}>
        <header style={styles.dashboardHeader}>
          <div>
            <p style={styles.welcomeLabel}>Welcome back</p>
            <h1 style={styles.dashboardTitle}>Student Dashboard</h1>
          </div>
          <div style={styles.studentBadge}>
            <strong>Saeki Ko</strong>
            <span>Student ID: TIU-2026-001</span>
          </div>
        </header>

        <section style={styles.statsGrid}>
          <InfoCard title="Current Courses" value="6" text="Spring Semester 2026" />
          <InfoCard title="Pending Assignments" value="3" text="Next due: June 28" />
          <InfoCard title="Attendance Rate" value="96%" text="Excellent standing" />
          <InfoCard title="GPA" value="3.7" text="Cumulative record" />
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>Campus Notices</h2>
            <Notice date="Jun 24" title="System maintenance scheduled this weekend" />
            <Notice date="Jun 21" title="International seminar applications are now open" />
            <Notice date="Jun 18" title="Library opening hours during summer term" />
          </div>

          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>Upcoming Assignments</h2>
            <Assignment subject="Cloud Infrastructure" task="Azure Static Web Apps report" due="Jun 28" />
            <Assignment subject="Academic English" task="Presentation outline" due="Jul 02" />
            <Assignment subject="Data Science" task="Python analysis exercise" due="Jul 05" />
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoCard({ title, value, text }) {
  return (
    <div style={styles.infoCard}>
      <p style={styles.infoTitle}>{title}</p>
      <h2 style={styles.infoValue}>{value}</h2>
      <p style={styles.infoText}>{text}</p>
    </div>
  );
}

function Notice({ date, title }) {
  return (
    <div style={styles.listItem}>
      <div style={styles.dateBox}>{date}</div>
      <div>{title}</div>
    </div>
  );
}

function Assignment({ subject, task, due }) {
  return (
    <div style={styles.assignmentItem}>
      <div>
        <strong>{subject}</strong>
        <p>{task}</p>
      </div>
      <span>{due}</span>
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
    textAlign: "center",
  },
  label: {
    fontSize: "13px",
    color: "#b08d2f",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "36px",
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

  dashboardPage: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#f4f6f9",
    fontFamily: "Arial, sans-serif",
    color: "#0b2341",
  },
  sidebar: {
    width: "260px",
    backgroundColor: "#0b2341",
    color: "white",
    padding: "32px 24px",
  },
  sidebarLogo: {
    fontFamily: "Georgia, serif",
    fontSize: "34px",
    fontWeight: "bold",
    letterSpacing: "3px",
  },
  sidebarTitle: {
    color: "#d6b25e",
    marginTop: "6px",
    marginBottom: "36px",
  },
  nav: {
    display: "grid",
    gap: "10px",
  },
  navActive: {
    backgroundColor: "#d6b25e",
    color: "#0b2341",
    padding: "12px",
    borderRadius: "6px",
    fontWeight: "bold",
  },
  navItem: {
    padding: "12px",
    borderRadius: "6px",
    color: "#dbe4f0",
  },
  dashboardMain: {
    flex: 1,
    padding: "40px",
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  welcomeLabel: {
    color: "#8a6b18",
    fontWeight: "bold",
    margin: 0,
  },
  dashboardTitle: {
    fontSize: "34px",
    margin: "6px 0 0",
  },
  studentBadge: {
    backgroundColor: "white",
    padding: "14px 18px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    display: "grid",
    gap: "4px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "24px",
  },
  infoCard: {
    backgroundColor: "white",
    padding: "22px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    borderTop: "4px solid #d6b25e",
  },
  infoTitle: {
    color: "#6b7280",
    margin: 0,
  },
  infoValue: {
    fontSize: "36px",
    margin: "8px 0",
  },
  infoText: {
    color: "#6b7280",
    margin: 0,
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  panel: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
  panelTitle: {
    marginTop: 0,
    marginBottom: "18px",
  },
  listItem: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  dateBox: {
    width: "56px",
    backgroundColor: "#eef2f7",
    color: "#0b2341",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "bold",
  },
  assignmentItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #e5e7eb",
  },
};

export default App;