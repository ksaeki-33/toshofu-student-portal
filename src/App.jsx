import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>TIU</div>
        <div style={styles.logoSub}>Student Portal</div>

        {[
          ["dashboard", "Dashboard"],
          ["notices", "Notices"],
          ["assignments", "Assignments"],
          ["schedule", "Schedule"],
          ["grades", "Grades"],
        ].map(([key, label]) => (
          <button
            key={key}
            style={activePage === key ? styles.navActive : styles.nav}
            onClick={() => setActivePage(key)}
          >
            {label}
          </button>
        ))}
      </aside>

      <main style={styles.main}>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "notices" && <Notices />}
        {activePage === "assignments" && <Assignments />}
        {activePage === "schedule" && <Schedule />}
        {activePage === "grades" && <Grades />}
      </main>
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <p style={styles.goldLabel}>Official Student Portal</p>
        <h1 style={styles.loginTitle}>Toshofu International University</h1>
        <p style={styles.loginText}>
          Access academic information, campus notices, assignments, schedules,
          and student records.
        </p>
        <input style={styles.input} placeholder="Student ID or Email" />
        <input style={styles.input} type="password" placeholder="Password" />
        <button style={styles.primaryButton} onClick={onLogin}>
          Sign In
        </button>
        <p style={styles.smallText}>For authorized students, faculty, and staff only.</p>
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <header style={styles.pageHeader}>
      <div>
        <p style={styles.goldLabel}>Toshofu International University</p>
        <h1 style={styles.pageTitle}>{title}</h1>
        <p style={styles.pageSubtitle}>{subtitle}</p>
      </div>
      <div style={styles.profileCard}>
        <strong>Saeki Ko</strong>
        <span>Student ID: TIU-2026-001</span>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Student Dashboard"
        subtitle="Overview of your academic status and campus information."
      />
      <section style={styles.grid4}>
        <Stat title="Current Courses" value="6" text="Spring Semester 2026" />
        <Stat title="Pending Assignments" value="3" text="Next due: Jun 28" />
        <Stat title="Attendance Rate" value="96%" text="Excellent standing" />
        <Stat title="GPA" value="3.7" text="Cumulative record" />
      </section>

      <section style={styles.grid2}>
        <Panel title="Latest Notices">
          <ListItem date="Jun 24" text="System maintenance scheduled this weekend." />
          <ListItem date="Jun 21" text="International seminar applications are open." />
          <ListItem date="Jun 18" text="Library opening hours during summer term." />
        </Panel>

        <Panel title="Upcoming Assignments">
          <Task subject="Cloud Infrastructure" task="Azure Static Web Apps report" due="Jun 28" />
          <Task subject="Academic English" task="Presentation outline" due="Jul 02" />
          <Task subject="Data Science" task="Python analysis exercise" due="Jul 05" />
        </Panel>
      </section>
    </>
  );
}

function Notices() {
  return (
    <>
      <PageHeader
        title="Campus Notices"
        subtitle="Important announcements from the university office."
      />
      <Panel title="All Notices">
        <ListItem date="Jun 24" text="System maintenance will be performed from 22:00 to 24:00." />
        <ListItem date="Jun 21" text="Applications for the Global Leadership Seminar are now open." />
        <ListItem date="Jun 18" text="The library will extend opening hours during the exam period." />
        <ListItem date="Jun 12" text="Career support guidance will be held in Hall A." />
      </Panel>
    </>
  );
}

function Assignments() {
  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle="Manage upcoming coursework and submission deadlines."
      />
      <Panel title="Assignment List">
        <Task subject="Cloud Infrastructure" task="Azure Static Web Apps report" due="Jun 28" />
        <Task subject="Academic English" task="Presentation outline" due="Jul 02" />
        <Task subject="Data Science" task="Python analysis exercise" due="Jul 05" />
        <Task subject="Information Security" task="Zero Trust short essay" due="Jul 09" />
      </Panel>
    </>
  );
}

function Schedule() {
  const rows = [
    ["Mon", "1st", "Cloud Infrastructure", "Room 301"],
    ["Tue", "2nd", "Academic English", "Room 204"],
    ["Wed", "3rd", "Data Science", "Lab 2"],
    ["Thu", "2nd", "Information Security", "Room 402"],
    ["Fri", "4th", "Global Studies", "Hall B"],
  ];

  return (
    <>
      <PageHeader
        title="Class Schedule"
        subtitle="Weekly timetable for the current semester."
      />
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Period</th>
              <th>Course</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.join("-")}>
                {r.map((c) => (
                  <td key={c}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Grades() {
  const rows = [
    ["Cloud Infrastructure", "A", "4"],
    ["Academic English", "B+", "3"],
    ["Data Science", "A-", "4"],
    ["Information Security", "A", "4"],
    ["Global Studies", "B", "2"],
  ];

  return (
    <>
      <PageHeader
        title="Academic Record"
        subtitle="Current academic performance summary."
      />
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c) => (
                  <td key={c}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({ title, value, text }) {
  return (
    <div style={styles.statCard}>
      <p>{title}</p>
      <h2>{value}</h2>
      <span>{text}</span>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section style={styles.panel}>
      <h2 style={styles.panelTitle}>{title}</h2>
      {children}
    </section>
  );
}

function ListItem({ date, text }) {
  return (
    <div style={styles.listItem}>
      <div style={styles.dateBox}>{date}</div>
      <p>{text}</p>
    </div>
  );
}

function Task({ subject, task, due }) {
  return (
    <div style={styles.taskItem}>
      <div>
        <strong>{subject}</strong>
        <p>{task}</p>
      </div>
      <span>{due}</span>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    background: "#f4f6f9",
    color: "#0b2341",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "260px",
    background: "#0b2341",
    color: "white",
    padding: "34px 24px",
  },
  logo: {
    fontFamily: "Georgia, serif",
    fontSize: "42px",
    fontWeight: "bold",
    letterSpacing: "4px",
    textAlign: "center",
  },
  logoSub: {
    color: "#d6b25e",
    textAlign: "center",
    marginBottom: "38px",
  },
  nav: {
    width: "100%",
    padding: "14px",
    marginBottom: "10px",
    background: "transparent",
    color: "#dbe4f0",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
  },
  navActive: {
    width: "100%",
    padding: "14px",
    marginBottom: "10px",
    background: "#d6b25e",
    color: "#0b2341",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "left",
  },
  main: {
    flex: 1,
    padding: "42px",
  },
  loginPage: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f6f8fb 0%, #e9eef5 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#0b2341",
  },
  loginCard: {
    width: "560px",
    background: "white",
    padding: "56px",
    borderRadius: "10px",
    borderTop: "6px solid #b08d2f",
    boxShadow: "0 20px 50px rgba(11,35,65,0.14)",
    textAlign: "center",
  },
  loginTitle: {
    fontSize: "36px",
    margin: "12px 0 16px",
  },
  loginText: {
    color: "#4b5563",
    lineHeight: 1.7,
    marginBottom: "28px",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "5px",
    fontSize: "15px",
  },
  primaryButton: {
    width: "100%",
    padding: "14px",
    background: "#0b2341",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  smallText: {
    marginTop: "18px",
    color: "#6b7280",
    fontSize: "13px",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
  },
  goldLabel: {
    color: "#9a7419",
    fontWeight: "bold",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    margin: 0,
  },
  pageTitle: {
    fontSize: "36px",
    margin: "8px 0",
  },
  pageSubtitle: {
    margin: 0,
    color: "#6b7280",
  },
  profileCard: {
    background: "white",
    padding: "16px 20px",
    borderRadius: "10px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    display: "grid",
    gap: "4px",
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "26px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  statCard: {
    background: "white",
    padding: "24px",
    borderRadius: "10px",
    borderTop: "4px solid #d6b25e",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
  panel: {
    background: "white",
    padding: "26px",
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
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 0",
  },
  dateBox: {
    minWidth: "58px",
    background: "#eef2f7",
    padding: "8px",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "bold",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 0",
  },
  tableCard: {
    background: "white",
    borderRadius: "10px",
    padding: "26px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default App;