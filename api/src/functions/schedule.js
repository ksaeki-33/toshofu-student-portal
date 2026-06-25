const { app } = require("@azure/functions");
const { localizeRecord, schedule } = require("../shared/data");

app.http("schedule", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request) => {
    const lang = request.query.get("lang") === "ja" ? "ja" : "en";

    return {
      jsonBody: schedule.map((classMeeting) => localizeRecord(classMeeting, lang)),
    };
  },
});
