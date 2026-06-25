import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "/api";

const text = {
  en: {
    portal: "Student Portal",
    officialPortal: "Official Student Portal",
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
    dashSub: "Overview of your academic status, campus notices, and upcoming coursework.",
    currentCourses: "Current Courses",
    pending: "Pending Assignments",
    attendance: "Attendance Rate",
    gpa: "GPA",
    latestNotices: "Latest Notices",
    upcomingAssignments: "Upcoming Assignments",
    todayClasses: "This Week's Classes",
    noticeTitle: "Campus Notices",
    noticeSub: "Important announcements from the university office.",
    assignmentTitle: "Assignments",
    assignmentSub: "Manage coursework, submission status, and deadlines.",
    scheduleTitle: "Class Schedule",
    scheduleSub: "Weekly timetable for the current semester.",
    gradesTitle: "Academic Record",
    gradesSub: "Current academic performance summary.",
    loading: "Loading portal data...",
    empty: "No records found.",
    retry: "Please start Azure Functions and try again.",
    due: "Due",
    points: "pts",
    category: "Category",
    audience: "Audience",
    course: "Course",
    status: "Status",
    day: "Day",
    period: "Period",
    time: "Time",
    room: "Room",
    instructor: "Instructor",
    grade: "Grade",
    credits: "Credits",
    term: "Term",
    adminReady: "Admin-ready account",
    studentServices: "Student Services",
    servicesText: "Advising, course registration, grade records, and campus messages are prepared as API resources.",
  },
  ja: {
    portal: "学生ポータル",
    officialPortal: "公式学生ポータル",
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
    dashSub: "学業状況、学内通知、今後の課題を確認できます。",
    currentCourses: "履修中の科目",
    pending: "未提出課題",
    attendance: "出席率",
    gpa: "GPA",
    latestNotices: "最新通知",
    upcomingAssignments: "今後の課題",
    todayClasses: "今週の授業",
    noticeTitle: "キャンパス通知",
    noticeSub: "大学事務局からの重要なお知らせです。",
    assignmentTitle: "課題",
    assignmentSub: "課題内容、提出状況、締切を確認できます。",
    scheduleTitle: "時間割",
    scheduleSub: "今学期の週間スケジュールです。",
    gradesTitle: "成績",
    gradesSub: "現在の学業成績の概要です。",
    loading: "ポータルデータを取得中...",
    empty: "表示できるデータがありません。",
    retry: "Azure Functions を起動してから再度お試しください。",
    due: "締切",
    points: "点",
    category: "分類",
    audience: "対象",
    course: "科目",
    status: "状況",
    day: "曜日",
    period: "時限",
    time: "時間",
    room: "教室",
    instructor: "担当教員",
    grade: "評価",
    credits: "単位",
    term: "学期",
    adminReady: "管理者対応アカウント",
    studentServices: "学生サービス",
    servicesText: "履修相談、履修登録、成績記録、学内メッセージを API リソースとして扱える構成です。",
  },
};

const emptyResources = {
  notices: [],
  assignments: [],
  schedule: [],
  grades: [],
};

async function apiFetch(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "API request failed.");
  }

  return data;
}

function App() {
  const [lang, setLang] = useState("en");
  const [activePage, setActivePage] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);
  const [resources, setResources] = useState(emptyResources);
  const [loadingResources, setLoadingResources] = useState(false);
  const [resourceError, setResourceError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    let ignore = false;

    async function loadPortalResources() {
      setLoadingResources(true);
      setResourceError("");

      try {
        const query = `?lang=${lang}&userId=${currentUser.id}`;
        const [notices, assignments, schedule, grades] = await Promise.all([
          apiFetch(`/notices${query}`),
          apiFetch(`/assignments${query}`),
          apiFetch(`/schedule${query}`),
          apiFetch(`/grades${query}`),
        ]);

        if (!ignore) {
          setResources({ notices, assignments, schedule, grades });
        }
      } catch (error) {
        if (!ignore) {
          setResourceError(error.message);
          setResources(emptyResources);
        }
      } finally {
        if (!ignore) {
          setLoadingResources(false);
        }
      }
    }

    loadPortalResources();

    return () => {
      ignore = true;
    };
  }, [currentUser, lang]);

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

        <nav className="nav-list" aria-label="Main navigation">
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
        {loadingResources && <StatusMessage text={text[lang].loading} />}
        {resourceError && <StatusMessage error text={`${resourceError} ${text[lang].retry}`} />}

        {activePage === "dashboard" && <Dashboard lang={lang} user={currentUser} data={resources} />}
        {activePage === "notices" && <Notices lang={lang} user={currentUser} notices={resources.notices} />}
        {activePage === "assignments" && (
          <Assignments lang={lang} user={currentUser} assignments={resources.assignments} />
        )}
        {activePage === "schedule" && <Schedule lang={lang} user={currentUser} schedule={resources.schedule} />}
        {activePage === "grades" && <Grades lang={lang} user={currentUser} grades={resources.grades} />}
      </main>
    </div>
  );
}

function Login({ lang, setLang, setCurrentUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
      });

      setCurrentUser({ ...result.user, demoToken: result.demoToken });
    } catch {
      setError(text[lang].loginError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <button type="button" className="lang-switch" onClick={() => setLang(lang === "en" ? "ja" : "en")}>
          {lang === "en" ? "日本語" : "English"}
        </button>

        <p className="gold-label">{text[lang].officialPortal}</p>
        <h1 className="login-title">Toshofu International University</h1>
        <p className="login-text">
          {lang === "en"
            ? "Access advising, campus notices, assignments, schedules, and official academic records."
            : "履修相談、学内通知、課題、時間割、公式成績情報を確認できます。"}
        </p>

        <input
          className="input"
          placeholder={text[lang].username}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="username"
        />
        <input
          className="input"
          type="password"
          placeholder={text[lang].password}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="error">{error}</p>}

        <button className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? text[lang].loading : text[lang].signIn}
        </button>
      </form>
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
        <span>{user.program}</span>
        {user.isAdmin && <span className="badge">{text[lang].adminReady}</span>}
      </div>
    </header>
  );
}

function Dashboard({ lang, user, data }) {
  const pendingAssignments = data.assignments.filter((assignment) =>
    assignment.status.toLowerCase().includes(lang === "en" ? "not" : "未")
  );

  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].dashTitle} subtitle={text[lang].dashSub} />

      <section className="stats-grid">
        <Stat title={text[lang].currentCourses} value={data.schedule.length} text={lang === "en" ? "Spring Semester 2026" : "2026年春学期"} />
        <Stat title={text[lang].pending} value={pendingAssignments.length} text={nextDueText(lang, data.assignments)} />
        <Stat title={text[lang].attendance} value="96%" text={lang === "en" ? "Good standing" : "良好"} />
        <Stat title={text[lang].gpa} value="3.7" text={lang === "en" ? "Current estimate" : "現在の見込み"} />
      </section>

      <section className="content-grid">
        <Panel title={text[lang].latestNotices}>
          {data.notices.slice(0, 3).map((notice) => (
            <ListItem key={notice.id} date={formatDate(notice.date, lang)} title={notice.title} text={notice.body} meta={notice.category} />
          ))}
          {!data.notices.length && <Empty lang={lang} />}
        </Panel>

        <Panel title={text[lang].upcomingAssignments}>
          {data.assignments.slice(0, 3).map((assignment) => (
            <Task key={assignment.id} lang={lang} assignment={assignment} />
          ))}
          {!data.assignments.length && <Empty lang={lang} />}
        </Panel>
      </section>

      <section className="content-grid lower-grid">
        <Panel title={text[lang].todayClasses}>
          {data.schedule.slice(0, 3).map((classMeeting) => (
            <ClassItem key={classMeeting.id} classMeeting={classMeeting} />
          ))}
          {!data.schedule.length && <Empty lang={lang} />}
        </Panel>

        <Panel title={text[lang].studentServices}>
          <p className="panel-copy">{text[lang].servicesText}</p>
        </Panel>
      </section>
    </>
  );
}

function Notices({ lang, user, notices }) {
  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].noticeTitle} subtitle={text[lang].noticeSub} />

      <Panel title={text[lang].notices}>
        {notices.map((notice) => (
          <ListItem
            key={notice.id}
            date={formatDate(notice.date, lang)}
            title={notice.title}
            text={notice.body}
            meta={`${text[lang].category}: ${notice.category} / ${text[lang].audience}: ${notice.audience}`}
          />
        ))}
        {!notices.length && <Empty lang={lang} />}
      </Panel>
    </>
  );
}

function Assignments({ lang, user, assignments }) {
  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].assignmentTitle} subtitle={text[lang].assignmentSub} />
      <Panel title={text[lang].assignments}>
        {assignments.map((assignment) => (
          <Task key={assignment.id} lang={lang} assignment={assignment} />
        ))}
        {!assignments.length && <Empty lang={lang} />}
      </Panel>
    </>
  );
}

function Schedule({ lang, user, schedule }) {
  const rows = schedule.map((classMeeting) => [
    classMeeting.day,
    classMeeting.period,
    classMeeting.time,
    `${classMeeting.courseCode} ${classMeeting.course}`,
    classMeeting.room,
    classMeeting.instructor,
  ]);

  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].scheduleTitle} subtitle={text[lang].scheduleSub} />
      <Table
        headers={[text[lang].day, text[lang].period, text[lang].time, text[lang].course, text[lang].room, text[lang].instructor]}
        rows={rows}
        lang={lang}
      />
    </>
  );
}

function Grades({ lang, user, grades }) {
  const rows = grades.map((grade) => [
    `${grade.courseCode} ${grade.course}`,
    grade.grade,
    String(grade.credits),
    grade.term,
  ]);

  return (
    <>
      <PageHeader lang={lang} user={user} title={text[lang].gradesTitle} subtitle={text[lang].gradesSub} />
      <Table headers={[text[lang].course, text[lang].grade, text[lang].credits, text[lang].term]} rows={rows} lang={lang} />
    </>
  );
}

function Stat({ title, value, text: description }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <span>{description}</span>
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

function ListItem({ date, title, text: body, meta }) {
  return (
    <article className="list-item">
      <div className="date-box">{date}</div>
      <div>
        {meta && <span className="item-meta">{meta}</span>}
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </article>
  );
}

function Task({ lang, assignment }) {
  return (
    <article className="task-item">
      <div>
        <span className="item-meta">{assignment.courseCode} / {assignment.course}</span>
        <strong>{assignment.title}</strong>
        <p>{text[lang].status}: {assignment.status}</p>
      </div>
      <span className="due-pill">
        {text[lang].due}: {formatDate(assignment.dueDate, lang)}
        <br />
        {assignment.points} {text[lang].points}
      </span>
    </article>
  );
}

function ClassItem({ classMeeting }) {
  return (
    <article className="task-item">
      <div>
        <span className="item-meta">{classMeeting.day} / {classMeeting.period} / {classMeeting.time}</span>
        <strong>{classMeeting.courseCode} {classMeeting.course}</strong>
        <p>{classMeeting.instructor}</p>
      </div>
      <span className="due-pill">{classMeeting.room}</span>
    </article>
  );
}

function Table({ headers, rows, lang }) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => <td key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <Empty lang={lang} />}
    </div>
  );
}

function StatusMessage({ text: message, error = false }) {
  return <p className={error ? "status-message error-message" : "status-message"}>{message}</p>;
}

function Empty({ lang }) {
  return <p className="empty">{text[lang].empty}</p>;
}

function formatDate(value, lang) {
  return new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function nextDueText(lang, assignments) {
  if (!assignments.length) {
    return lang === "en" ? "No pending work" : "未提出課題なし";
  }

  return `${text[lang].due}: ${formatDate(assignments[0].dueDate, lang)}`;
}

export default App;
