const { app } = require("@azure/functions");
const { CosmosClient } = require("@azure/cosmos");

const databaseId = "tiu-db";
const containerId = "students";

let container;

function getStudentsContainer() {
  if (container) {
    return container;
  }

  const connectionString = process.env.COSMOS_CONNECTION_STRING;

  if (!connectionString) {
    throw new Error("COSMOS_CONNECTION_STRING is not configured.");
  }

  const client = new CosmosClient(connectionString);
  container = client.database(databaseId).container(containerId);

  return container;
}

function withoutPassword(student) {
  const publicStudent = { ...student };
  delete publicStudent.password;
  return publicStudent;
}

app.http("login", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    let body;

    try {
      body = await request.json();
    } catch {
      return {
        status: 400,
        jsonBody: { message: "Invalid request body." },
      };
    }

    const studentId = String(body?.studentId || "").trim();
    const password = String(body?.password || "");

    if (!studentId || !password) {
      return {
        status: 400,
        jsonBody: { message: "studentId and password are required." },
      };
    }

    try {
      const { resources } = await getStudentsContainer()
        .items.query(
          {
            query: "SELECT * FROM c WHERE c.studentId = @studentId",
            parameters: [{ name: "@studentId", value: studentId }],
          },
          { partitionKey: studentId }
        )
        .fetchAll();

      const student = resources[0];

      if (!student || student.password !== password) {
        return {
          status: 401,
          jsonBody: { message: "Student ID or password is incorrect." },
        };
      }

      return {
        jsonBody: {
          student: withoutPassword(student),
        },
      };
    } catch (error) {
      context.error(error);

      return {
        status: 500,
        jsonBody: { message: "Login service is unavailable." },
      };
    }
  },
});
