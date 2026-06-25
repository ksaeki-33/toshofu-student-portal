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

    const name = String(body?.name || "").trim().toLowerCase();
    const password = String(body?.password || "");
    const user = users.find(
      (candidate) => candidate.name.toLowerCase() === name && candidate.password === password
    );

    if (!user) {
      return {
        status: 401,
        jsonBody: { message: "User name or password is incorrect." },
      };
    }

    return {
      jsonBody: {
        user: publicUser(user),
        demoToken: `demo-${user.id}`,
      },
    };
  },
});
