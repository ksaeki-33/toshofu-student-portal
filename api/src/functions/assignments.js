const { app } = require("@azure/functions");
const { assignments, localizeRecord } = require("../shared/data");

app.http("assignments", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request) => {
    const lang = request.query.get("lang") === "ja" ? "ja" : "en";

    return {
      jsonBody: assignments.map((assignment) => localizeRecord(assignment, lang)),
    };
  },
});
