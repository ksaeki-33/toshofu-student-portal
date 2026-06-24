const { app } = require("@azure/functions");

app.http("notices", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    return {
      jsonBody: [
        {
          id: 1,
          title: "システムメンテナンス",
          date: "2026-06-24",
        },
        {
          id: 2,
          title: "国際セミナー募集開始",
          date: "2026-06-21",
        },
      ],
    };
  },
});