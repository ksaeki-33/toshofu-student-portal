const { app } = require("@azure/functions");
const { localizeRecord, notices } = require("../shared/data");

app.http("notices", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request) => {
    const lang = request.query.get("lang") === "ja" ? "ja" : "en";

    return {
      jsonBody: notices.map((notice) => localizeRecord(notice, lang)),
    };
  },
});
