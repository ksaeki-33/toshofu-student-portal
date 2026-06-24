import { useState } from "react";
import "./App.css";

const USERS = [
  { name: "Kohei Sakaki", password: "0001", id: "TIU-2026-001", role: "Chairperson" },
  { name: "Ko saeki", password: "0002", id: "TIU-2026-002", role: "IT Department" },
  { name: "Soma Kakehi", password: "0003", id: "TIU-2026-003", role: "Student" },
  { name: "Yuto Nakamaru", password: "0004", id: "TIU-2026-004", role: "Student" },
  { name: "So Tomita", password: "0005", id: "TIU-2026-005", role: "Student" },
  { name: "Keisuke Miyazono", password: "0006", id: "TIU-2026-006", role: "Student" },
  { name: "Masaya Shimizu", password: "0007", id: "TIU-2026-007", role: "Student" },
];

const text = {
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
    ["dashboard", text[lang].dashboard],
    ["notices", text[lang].notices],
    ["assignments", text[lang].assignments],
    ["schedule", text[lang].schedule],
    ["grades", text[lang].grades],
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">TIU</div>
          <div className="logo-sub">{text[lang].portal}</div>
        </div>

        <nav className="nav-list">
          {menu.map(([key, label]) => (
            <button
              key={key}
              className={activePage === key ? "nav active" : "nav"}
              onClick={() => setActivePage(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-actions">
          <button className="lang-button" onClick={() => setLang(lang === "en" ? "ja" : "en")}>
            {lang === "en" ? "日本語" : "English"}
          </button>
          <button className="logout-button" onClick={() => setCurrentUser(null)}>
            {text[lang].logout}
          </button>
        </div>
      </aside>

      <main className="main">
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
      setError(text[lang].loginError);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <button className="lang-switch" onClick={() => setLang(lang === "en" ? "ja" : "en")}>
          {lang === "en" ? "日本語" : "English"}
        </button>

        <p className="gold-label">Official Student Portal</p>
        <h1 className="login-title">Toshofu International University</h1>
        <p className="login-text">
          {lang === "en"
            ? "Access academic information, campus notices, assignments, schedules, and student records."
            : "履修情報、学内通知、課題、時間割、成績情報を確認できます。"}
        </p>

        <input
          className="input"
          placeholder={text[lang].username}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder={text[lang].password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button className="primary-button" onClick={handleLogin}>
          {text[lang].signIn}
        </button>
      </div>
    </div>
  );
}

function PageHeader({ lang, user, title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        <p className="gold-label">{text[lang].welcome}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <div className="profile-card">
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
      <PageHeader lang={lang} user={user} title={text[lang].dashTitle} subtitle={text[lang].dashSub} />

      <section className="stats-grid">
        <Stat title={text[lang].currentCourses} value="6" text={lang === "en" ? "Spring Semester 2026" : "2026年春学期"} />
        <Stat title={text[lang].pending} value="3" text={lang === "en" ? "Next due: Jun 28" : "次回締切：6月28日"} />
        <Stat title={text[lang].attendance} value="96%" text={lang === "en" ? "Excellent standing" : "良好"} />
        <Stat title={text[lang].gpa} value="3.7" text={lang === "en" ? "Cumulative record" : "累計成績"} />
      </section>

      <section className="content-grid">
        <Panel title={text[lang].latestNotices}>
          <ListItem date="Jun 24" text={lang === "en" ? "System maintenance scheduled this weekend." : "今週末にシステムメンテナンスを実施します。"} />
          <ListItem date="Jun 21" text={lang === "en" ? "International seminar applications are open." : "国際セミナーの申込受付を開始しました。"} />
        </Panel>

        <Panel title={text[lang].upcomingAssignments}>
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
      <PageHeader lang={lang} user={user} title={text[lang].noticeTitle} subtitle={text[lang].noticeSub} />
      <Panel title={text[lang].notices}>
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
      <PageHeader lang={lang} user={user} title={text[lang].assignmentTitle} subtitle={text[lang].assignmentSub} />
      <Panel title={text[lang].assignments}>
        <Task subject={lang === "en" ? "Cloud Infrastructure" : "クラウド基盤"} task="Azure Static Web Apps report" due="Jun 28" />
        <Task subject={lang === "en" ? "Information Security" : "情報セキュリティ"} task={lang === "en" ? "Zero Trust short essay" : "ゼロトラスト小論文"} due="Jul 09" />
      </Panel>
    </>
  );
}

function Schedule({ lang, user }) {
  const rows =
    lang === "en"
      ? [
          ["Mon", "1st", "Cloud Infrastructure", "Room 301"],
          ["Tue", "2nd", "Academic English", "Room 204"],
          ["Wed", "3rd", "Data Science", "Lab 2"],
        ]
      : [
          ["月", "1限", "クラウド基盤", "301教室"],
          ["火", "2限", "学術英語", "204教室"],
          ["水", "3限", "データサイエンス", "第2実習室"],
        ];

  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].scheduleTitle} subtitle={text[lang].scheduleSub} />
      <Table headers={lang === "en" ? ["Day", "Period", "Course", "Room"] : ["曜日", "時限", "科目", "教室"]} rows={rows} />
    </>
  );
}

function Grades({ lang, user }) {
  const rows =
    lang === "en"
      ? [
          ["Cloud Infrastructure", "A", "4"],
          ["Academic English", "B+", "3"],
          ["Data Science", "A-", "4"],
        ]
      : [
          ["クラウド基盤", "A", "4"],
          ["学術英語", "B+", "3"],
          ["データサイエンス", "A-", "4"],
        ];

  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].gradesTitle} subtitle={text[lang].gradesSub} />
      <Table headers={lang === "en" ? ["Course", "Grade", "Credits"] : ["科目", "評価", "単位"]} rows={rows} />
    </>
  );
}

function Stat({ title, value, text }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <span>{text}</span>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ListItem({ date, text }) {
  return (
    <div className="list-item">
      <div className="date-box">{date}</div>
      <p>{text}</p>
    </div>
  );
}

function Task({ subject, task, due }) {
  return (
    <div className="task-item">
      <div>
        <strong>{subject}</strong>
        <p>{task}</p>
      </div>
      <span>{due}</span>
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.join("-")}>
              {r.map((c) => <td key={c}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;