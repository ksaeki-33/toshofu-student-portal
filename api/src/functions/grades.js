const { app } = require("@azure/functions");
const { grades, localizeRecord } = require("../shared/data");

app.http("grades", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request) => {
    const lang = request.query.get("lang") === "ja" ? "ja" : "en";

    return {
      jsonBody: grades.map((grade) => localizeRecord(grade, lang)),
    };
  },
});
