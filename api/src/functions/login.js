const { app } = require("@azure/functions");
const { publicUser, users } = require("../shared/data");

app.http("login", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    let body;

    try {
      body = await request.json();
    } catch {
      return {
        status: 400,
        jsonBody: { message: "Invalid request body." },
      };
    }

    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");

    if (!username || !password) {
      return {
        status: 400,
        jsonBody: { message: "username and password are required." },
      };
    }

    const student = users.find(
      (user) => user.username?.toLowerCase() === username.toLowerCase() && user.password === password
    );

    if (!student) {
      return {
        status: 401,
        jsonBody: { message: "Username or password is incorrect." },
      };
    }

    return {
      jsonBody: {
        student: publicUser(student),
      },
    };
  },
});
