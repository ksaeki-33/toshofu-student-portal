import { useState } from "react";

const USERS = [
  { name: "Kohei Sakaki", password: "0001", id: "TIU-2026-001", role: "Chairperson" },
  { name: "Ko saeki", password: "0002", id: "TIU-2026-002", role: "IT Department" },
  { name: "Soma Kakehi", password: "0003", id: "TIU-2026-003", role: "Student" },
  { name: "Yuto Nakamaru", password: "0004", id: "TIU-2026-004", role: "Student" },
  { name: "So Tomita", password: "0005", id: "TIU-2026-005", role: "Student" },
  { name: "Keisuke Miyazono", password: "0006", id: "TIU-2026-006", role: "Student" },
  { name: "Masaya Shimizu", password: "0007", id: "TIU-2026-007", role: "Student" },
];

const t = {
  en: {
    portal: "Student Portal",
    signIn: "Sign In",
    username: "User Name",
    password: "Password",
    loginError: "User name or password is incorrect.",
    logout: "Logout",
    dashboard: "Dashboard",
    notices: "Notices",
    assignments: "Assignments",
    schedule: "Schedule",
    grades: "Grades",
    welcome: "Welcome back",
    dashTitle: "Student Dashboard",
    dashSub: "Overview of your academic status and campus information.",
    currentCourses: "Current Courses",
    pending: "Pending Assignments",
    attendance: "Attendance Rate",
    gpa: "GPA",
    latestNotices: "Latest Notices",
    upcomingAssignments: "Upcoming Assignments",
    noticeTitle: "Campus Notices",
    noticeSub: "Important announcements from the university office.",
    assignmentTitle: "Assignments",
    assignmentSub: "Manage upcoming coursework and submission deadlines.",
    scheduleTitle: "Class Schedule",
    scheduleSub: "Weekly timetable for the current semester.",
    gradesTitle: "Academic Record",
    gradesSub: "Current academic performance summary.",
  },
  ja: {
    portal: "学生ポータル",
    signIn: "ログイン",
    username: "ユーザー名",
    password: "パスワード",
    loginError: "ユーザー名またはパスワードが正しくありません。",
    logout: "ログアウト",
    dashboard: "ダッシュボード",
    notices: "通知",
    assignments: "課題",
    schedule: "時間割",
    grades: "成績",
    welcome: "おかえりなさい",
    dashTitle: "学生ダッシュボード",
    dashSub: "学業状況と学内情報を確認できます。",
    currentCourses: "履修中の科目",
    pending: "未提出課題",
    attendance: "出席率",
    gpa: "GPA",
    latestNotices: "最新通知",
    upcomingAssignments: "今後の課題",
    noticeTitle: "キャンパス通知",
    noticeSub: "大学事務局からの重要なお知らせです。",
    assignmentTitle: "課題",
    assignmentSub: "課題内容と提出期限を確認できます。",
    scheduleTitle: "時間割",
    scheduleSub: "今学期の週間スケジュールです。",
    gradesTitle: "成績",
    gradesSub: "現在の学業成績の概要です。",
  },
};

function App() {
  const [lang, setLang] = useState("en");
  const [activePage, setActivePage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);

  if (!currentUser) {
    return <Login lang={lang} setLang={setLang} setCurrentUser={setCurrentUser} />;
  }

  const menu = [
    ["dashboard", t[lang].dashboard],
    ["notices", t[lang].notices],
    ["assignments", t[lang].assignments],
    ["schedule", t[lang].schedule],
    ["grades", t[lang].grades],
  ];

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>TIU</div>
        <div style={styles.logoSub}>{t[lang].portal}</div>

        {menu.map(([key, label]) => (
          <button
            key={key}
            style={activePage === key ? styles.navActive : styles.nav}
            onClick={() => setActivePage(key)}
          >
            {label}
          </button>
        ))}

        <button style={styles.langButton} onClick={() => setLang(lang === "en" ? "ja" : "en")}>
          {lang === "en" ? "日本語" : "English"}
        </button>

        <button style={styles.logoutButton} onClick={() => setCurrentUser(null)}>
          {t[lang].logout}
        </button>
      </aside>

      <main style={styles.main}>
        {activePage === "dashboard" && <Dashboard lang={lang} user={currentUser} />}
        {activePage === "notices" && <Notices lang={lang} user={currentUser} />}
        {activePage === "assignments" && <Assignments lang={lang} user={currentUser} />}
        {activePage === "schedule" && <Schedule lang={lang} user={currentUser} />}
        {activePage === "grades" && <Grades lang={lang} user={currentUser} />}
      </main>
    </div>
  );
}

function Login({ lang, setLang, setCurrentUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = USERS.find(
      (u) => u.name.toLowerCase() === name.trim().toLowerCase() && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      setError("");
    } else {
      setError(t[lang].loginError);
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <button style={styles.langSwitch} onClick={() => setLang(lang === "en" ? "ja" : "en")}>
          {lang === "en" ? "日本語" : "English"}
        </button>

        <p style={styles.goldLabel}>Official Student Portal</p>
        <h1 style={styles.loginTitle}>Toshofu International University</h1>
        <p style={styles.loginText}>
          {lang === "en"
            ? "Access academic information, campus notices, assignments, schedules, and student records."
            : "履修情報、学内通知、課題、時間割、成績情報を確認できます。"}
        </p>

        <input
          style={styles.input}
          placeholder={t[lang].username}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder={t[lang].password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.primaryButton} onClick={handleLogin}>
          {t[lang].signIn}
        </button>
      </div>
    </div>
  );
}

function PageHeader({ lang, user, title, subtitle }) {
  return (
    <header style={styles.pageHeader}>
      <div>
        <p style={styles.goldLabel}>{t[lang].welcome}</p>
        <h1 style={styles.pageTitle}>{title}</h1>
        <p style={styles.pageSubtitle}>{subtitle}</p>
      </div>
      <div style={styles.profileCard}>
        <strong>{user.name}</strong>
        <span>{user.id}</span>
        <span>{user.role}</span>
      </div>
    </header>
  );
}

function Dashboard({ lang, user }) {
  return (
    <>
      <PageHeader lang={lang} user={user} title={t[lang].dashTitle} subtitle={t[lang].dashSub} />
      <section style={styles.grid4}>
        <Stat title={t[lang].currentCourses} value="6" text={lang === "en" ? "Spring Semester 2026" : "2026年春学期"} />
        <Stat title={t[lang].pending} value="3" text={lang === "en" ? "Next due: Jun 28" : "次回締切：6月28日"} />
        <Stat title={t[lang].attendance} value="96%" text={lang === "en" ? "Excellent standing" : "良好"} />
        <Stat title={t[lang].gpa} value="3.7" text={lang === "en" ? "Cumulative record" : "累計成績"} />
      </section>

      <section style={styles.grid2}>
        <Panel title={t[lang].latestNotices}>
          <ListItem date="Jun 24" text={lang === "en" ? "System maintenance scheduled this weekend." : "今週末にシステムメンテナンスを実施します。"} />
          <ListItem date="Jun 21" text={lang === "en" ? "International seminar applications are open." : "国際セミナーの申込受付を開始しました。"} />
        </Panel>

        <Panel title={t[lang].upcomingAssignments}>
          <Task subject={lang === "en" ? "Cloud Infrastructure" : "クラウド基盤"} task="Azure Static Web Apps report" due="Jun 28" />
          <Task subject={lang === "en" ? "Academic English" : "学術英語"} task={lang === "en" ? "Presentation outline" : "発表概要"} due="Jul 02" />
        </Panel>
      </section>
    </>
  );
}

function Notices({ lang, user }) {
  return (
    <>
      <PageHeader lang={lang} user={user} title={t[lang].noticeTitle} subtitle={t[lang].noticeSub} />
      <Panel title={t[lang].notices}>
        <ListItem date="Jun 24" text={lang === "en" ? "System maintenance will be performed from 22:00 to 24:00." : "22:00〜24:00にシステムメンテナンスを実施します。"} />
        <ListItem date="Jun 21" text={lang === "en" ? "Global Leadership Seminar applications are now open." : "グローバルリーダーシップセミナーの申込を開始しました。"} />
        <ListItem date="Jun 18" text={lang === "en" ? "Library hours will be extended during exams." : "試験期間中、図書館の開館時間を延長します。"} />
      </Panel>
    </>
  );
}

function Assignments({ lang, user }) {
  return (
    <>
      <PageHeader lang={lang} user={user} title={t[lang].assignmentTitle} subtitle={t[lang].assignmentSub} />
      <Panel title={t[lang].assignments}>
        <Task subject={lang === "en" ? "Cloud Infrastructure" : "クラウド基盤"} task="Azure Static Web Apps report" due="Jun 28" />
        <Task subject={lang === "en" ? "Information Security" : "情報セキュリティ"} task={lang === "en" ? "Zero Trust short essay" : "ゼロトラスト小論文"} due="Jul 09" />
      </Panel>
    </>
  );
}

function Schedule({ lang, user }) {
  const rows = lang === "en"
    ? [["Mon", "1st", "Cloud Infrastructure", "Room 301"], ["Tue", "2nd", "Academic English", "Room 204"], ["Wed", "3rd", "Data Science", "Lab 2"]]
    : [["月", "1限", "クラウド基盤", "301教室"], ["火", "2限", "学術英語", "204教室"], ["水", "3限", "データサイエンス", "第2実習室"]];

  return (
    <>
      <PageHeader lang={lang} user={user} title={t[lang].scheduleTitle} subtitle={t[lang].scheduleSub} />
      <Table headers={lang === "en" ? ["Day", "Period", "Course", "Room"] : ["曜日", "時限", "科目", "教室"]} rows={rows} />
    </>
  );
}

function Grades({ lang, user }) {
  const rows = lang === "en"
    ? [["Cloud Infrastructure", "A", "4"], ["Academic English", "B+", "3"], ["Data Science", "A-", "4"]]
    : [["クラウド基盤", "A", "4"], ["学術英語", "B+", "3"], ["データサイエンス", "A-", "4"]];

  return (
    <>
      <PageHeader lang={lang} user={user} title={t[lang].gradesTitle} subtitle={t[lang].gradesSub} />
      <Table headers={lang === "en" ? ["Course", "Grade", "Credits"] : ["科目", "評価", "単位"]} rows={rows} />
    </>
  );
}

function Stat({ title, value, text }) {
  return <div style={styles.statCard}><p>{title}</p><h2>{value}</h2><span>{text}</span></div>;
}

function Panel({ title, children }) {
  return <section style={styles.panel}><h2>{title}</h2>{children}</section>;
}

function ListItem({ date, text }) {
  return <div style={styles.listItem}><div style={styles.dateBox}>{date}</div><p>{text}</p></div>;
}

function Task({ subject, task, due }) {
  return <div style={styles.taskItem}><div><strong>{subject}</strong><p>{task}</p></div><span>{due}</span></div>;
}

function Table({ headers, rows }) {
  return (
    <div style={styles.tableCard}>
      <table style={styles.table}>
        <thead><tr>{headers.map((h) => <th key={h} style={styles.th}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => <tr key={r.join("-")}>{r.map((c) => <td key={c} style={styles.td}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", display: "flex", background: "#f4f6f9", color: "#0b2341", fontFamily: "Arial, sans-serif" },
  sidebar: { width: "260px", background: "#0b2341", color: "white", padding: "34px 24px" },
  logo: { fontFamily: "Georgia, serif", fontSize: "42px", fontWeight: "bold", letterSpacing: "4px", textAlign: "center" },
  logoSub: { color: "#d6b25e", textAlign: "center", marginBottom: "38px" },
  nav: { width: "100%", padding: "14px", marginBottom: "10px", background: "transparent", color: "#dbe4f0", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", textAlign: "left" },
  navActive: { width: "100%", padding: "14px", marginBottom: "10px", background: "#d6b25e", color: "#0b2341", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", textAlign: "left" },
  langButton: { width: "100%", padding: "12px", marginTop: "22px", background: "transparent", color: "#d6b25e", border: "1px solid #d6b25e", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  logoutButton: { width: "100%", padding: "12px", marginTop: "12px", background: "#ffffff10", color: "white", border: "1px solid #ffffff44", borderRadius: "8px", cursor: "pointer" },
  main: { flex: 1, padding: "42px" },
  loginPage: { minHeight: "100vh", background: "linear-gradient(135deg, #f6f8fb 0%, #e9eef5 100%)", display: "flex", justifyContent: "center", alignItems: "center", color: "#0b2341" },
  loginCard: { width: "560px", background: "white", padding: "56px", borderRadius: "10px", borderTop: "6px solid #b08d2f", boxShadow: "0 20px 50px rgba(11,35,65,0.14)", textAlign: "center" },
  loginTitle: { fontSize: "36px", margin: "12px 0 16px" },
  loginText: { color: "#4b5563", lineHeight: 1.7, marginBottom: "28px" },
  input: { width: "100%", padding: "14px", marginBottom: "14px", border: "1px solid #cbd5e1", borderRadius: "5px", fontSize: "15px" },
  primaryButton: { width: "100%", padding: "14px", background: "#0b2341", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" },
  langSwitch: { marginBottom: "20px", padding: "8px 14px", background: "white", color: "#0b2341", border: "1px solid #b08d2f", borderRadius: "6px", cursor: "pointer" },
  error: { color: "#b91c1c", fontWeight: "bold" },
  goldLabel: { color: "#9a7419", fontWeight: "bold", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" },
  pageTitle: { fontSize: "36px", margin: "8px 0" },
  pageSubtitle: { margin: 0, color: "#6b7280" },
  profileCard: { background: "white", padding: "16px 20px", borderRadius: "10px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)", display: "grid", gap: "4px" },
  grid4: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "26px" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  statCard: { background: "white", padding: "24px", borderRadius: "10px", borderTop: "4px solid #d6b25e", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
  panel: { background: "white", padding: "26px", borderRadius: "10px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
  listItem: { display: "flex", gap: "14px", alignItems: "center", borderBottom: "1px solid #e5e7eb", padding: "14px 0" },
  dateBox: { minWidth: "58px", background: "#eef2f7", padding: "8px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" },
  taskItem: { display: "flex", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #e5e7eb", padding: "14px 0" },
  tableCard: { background: "white", borderRadius: "10px", padding: "26px", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "14px", borderBottom: "2px solid #d6b25e" },
  td: { padding: "14px", borderBottom: "1px solid #e5e7eb" },
};

export default App;