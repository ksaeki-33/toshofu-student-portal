const users = [
  {
    id: "TIU-2026-001",
    username: "testuser",
    name: "Kohei Sakaki",
    password: "0001",
    role: "Chairperson",
    isAdmin: true,
    year: 4,
    program: "Global Business and Technology",
  },
  {
    id: "TIU-2026-002",
    name: "Ko saeki",
    password: "0002",
    role: "IT Department",
    isAdmin: true,
    year: 3,
    program: "Information Systems",
  },
  {
    id: "TIU-2026-003",
    name: "Soma Kakehi",
    password: "0003",
    role: "Student",
    isAdmin: false,
    year: 2,
    program: "International Liberal Arts",
  },
  {
    id: "TIU-2026-004",
    name: "Yuto Nakamaru",
    password: "0004",
    role: "Student",
    isAdmin: false,
    year: 2,
    program: "Global Business and Technology",
  },
  {
    id: "TIU-2026-005",
    name: "So Tomita",
    password: "0005",
    role: "Student",
    isAdmin: false,
    year: 1,
    program: "Information Systems",
  },
  {
    id: "TIU-2026-006",
    name: "Keisuke Miyazono",
    password: "0006",
    role: "Student",
    isAdmin: false,
    year: 3,
    program: "International Relations",
  },
  {
    id: "TIU-2026-007",
    name: "Masaya Shimizu",
    password: "0007",
    role: "Student",
    isAdmin: false,
    year: 4,
    program: "Data Science",
  },
];

const notices = [
  {
    id: "notice-001",
    date: "2026-06-24",
    category: { en: "Systems", ja: "システム" },
    title: {
      en: "Student portal maintenance is scheduled this weekend.",
      ja: "今週末に学生ポータルのメンテナンスを実施します。",
    },
    body: {
      en: "Some services may be unavailable on Saturday evening while authentication and grade services are updated.",
      ja: "認証および成績サービス更新のため、土曜日の夕方に一部機能が利用できない場合があります。",
    },
    audience: "All students",
  },
  {
    id: "notice-002",
    date: "2026-06-21",
    category: { en: "International Programs", ja: "国際プログラム" },
    title: {
      en: "Applications are open for the Asia-Pacific leadership seminar.",
      ja: "アジア太平洋リーダーシップセミナーの申込受付を開始しました。",
    },
    body: {
      en: "Students can apply through the international office until July 5.",
      ja: "7月5日まで国際交流課で申し込みを受け付けています。",
    },
    audience: "Undergraduate students",
  },
  {
    id: "notice-003",
    date: "2026-06-18",
    category: { en: "Student Affairs", ja: "学生支援" },
    title: {
      en: "Advising week appointments are now available.",
      ja: "アカデミックアドバイジング週間の予約を開始しました。",
    },
    body: {
      en: "Meet your faculty advisor to review course registration, attendance, and graduation progress.",
      ja: "履修登録、出席状況、卒業要件の確認のため、担当教員との面談を予約してください。",
    },
    audience: "All students",
  },
];

const assignments = [
  {
    id: "assignment-001",
    courseCode: "CIT301",
    course: { en: "Cloud Infrastructure", ja: "クラウド基盤" },
    title: {
      en: "Azure Static Web Apps deployment report",
      ja: "Azure Static Web Apps デプロイレポート",
    },
    dueDate: "2026-06-28",
    status: { en: "Not submitted", ja: "未提出" },
    points: 20,
  },
  {
    id: "assignment-002",
    courseCode: "ENG204",
    course: { en: "Academic English", ja: "学術英語" },
    title: { en: "Research presentation outline", ja: "研究発表アウトライン" },
    dueDate: "2026-07-02",
    status: { en: "Draft saved", ja: "下書き保存済み" },
    points: 15,
  },
  {
    id: "assignment-003",
    courseCode: "SEC210",
    course: { en: "Information Security", ja: "情報セキュリティ" },
    title: { en: "Zero Trust short essay", ja: "ゼロトラスト小論文" },
    dueDate: "2026-07-09",
    status: { en: "Not submitted", ja: "未提出" },
    points: 10,
  },
];

const schedule = [
  {
    id: "schedule-001",
    day: { en: "Monday", ja: "月曜日" },
    period: { en: "1st period", ja: "1限" },
    time: "09:00-10:30",
    courseCode: "CIT301",
    course: { en: "Cloud Infrastructure", ja: "クラウド基盤" },
    room: { en: "Room 301", ja: "301教室" },
    instructor: "Prof. Akiyama",
  },
  {
    id: "schedule-002",
    day: { en: "Tuesday", ja: "火曜日" },
    period: { en: "2nd period", ja: "2限" },
    time: "10:45-12:15",
    courseCode: "ENG204",
    course: { en: "Academic English", ja: "学術英語" },
    room: { en: "Room 204", ja: "204教室" },
    instructor: "Dr. Miller",
  },
  {
    id: "schedule-003",
    day: { en: "Wednesday", ja: "水曜日" },
    period: { en: "3rd period", ja: "3限" },
    time: "13:10-14:40",
    courseCode: "DS220",
    course: { en: "Data Science", ja: "データサイエンス" },
    room: { en: "Lab 2", ja: "第2実習室" },
    instructor: "Prof. Nakamura",
  },
  {
    id: "schedule-004",
    day: { en: "Friday", ja: "金曜日" },
    period: { en: "4th period", ja: "4限" },
    time: "14:55-16:25",
    courseCode: "IR180",
    course: { en: "Global Issues Forum", ja: "国際課題フォーラム" },
    room: { en: "Global Hall", ja: "グローバルホール" },
    instructor: "Dr. Chen",
  },
];

const grades = [
  {
    id: "grade-001",
    courseCode: "CIT301",
    course: { en: "Cloud Infrastructure", ja: "クラウド基盤" },
    credits: 4,
    grade: "A",
    term: { en: "Spring 2026", ja: "2026年春学期" },
  },
  {
    id: "grade-002",
    courseCode: "ENG204",
    course: { en: "Academic English", ja: "学術英語" },
    credits: 3,
    grade: "B+",
    term: { en: "Spring 2026", ja: "2026年春学期" },
  },
  {
    id: "grade-003",
    courseCode: "DS220",
    course: { en: "Data Science", ja: "データサイエンス" },
    credits: 4,
    grade: "A-",
    term: { en: "Spring 2026", ja: "2026年春学期" },
  },
  {
    id: "grade-004",
    courseCode: "IR180",
    course: { en: "Global Issues Forum", ja: "国際課題フォーラム" },
    credits: 2,
    grade: "A",
    term: { en: "Spring 2026", ja: "2026年春学期" },
  },
];

function publicUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    studentId: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    isAdmin: user.isAdmin,
    year: user.year,
    program: user.program,
  };
}

function localize(value, lang = "en") {
  if (value && typeof value === "object" && "en" in value && "ja" in value) {
    return value[lang] || value.en;
  }

  return value;
}

function localizeRecord(record, lang) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, localize(value, lang)])
  );
}

module.exports = {
  assignments,
  grades,
  localizeRecord,
  notices,
  publicUser,
  schedule,
  users,
};
