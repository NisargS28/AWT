const EventEmitter = require("events");
const { MongoClient } = require("mongodb");

const eventEmitter = new EventEmitter();

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "awt_practice";
const collectionName = process.env.EVENTS_COLLECTION || "events";

let eventsCollection = null;

const eventCount = {
  "user-login": 0,
  "user-logout": 0,
  "user-purchase": 0,
  "profile-update": 0
};

eventEmitter.on("user-login", async (username) => {
  eventCount["user-login"]++;
  console.log(`User logged in: ${username}`);
  await logEvent("user-login", { username });
});

eventEmitter.on("user-logout", async (username) => {
  eventCount["user-logout"]++;
  console.log(`User logged out: ${username}`);
  await logEvent("user-logout", { username });
});

eventEmitter.on("user-purchase", async (username, item) => {
  eventCount["user-purchase"]++;
  console.log(`User ${username} purchased ${item}`);
  await logEvent("user-purchase", { username, item });
});

eventEmitter.on("profile-update", async (username, field) => {
  eventCount["profile-update"]++;
  console.log(`User ${username} updated ${field}`);
  await logEvent("profile-update", { username, field });
});

eventEmitter.on("summary", async () => {
  console.log("\n📊 EVENT SUMMARY REPORT");
  console.log("----------------------");
  for (let event in eventCount) {
    console.log(`${event}: ${eventCount[event]} time(s)`);
  }
  await logEvent("summary", { counts: { ...eventCount } });
});

async function logEvent(type, data) {
  if (!eventsCollection) {
    return;
  }
  try {
    await eventsCollection.insertOne({
      type,
      data,
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Failed to write event to MongoDB:", error.message);
  }
}

async function main() {
  if (!mongoUri) {
    console.error("Missing MONGODB_URI env var.");
    return;
  }

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    eventsCollection = client.db(dbName).collection(collectionName);

    eventEmitter.emit("user-login", "Nisarg");
    eventEmitter.emit("user-purchase", "Nisarg", "Laptop");
    eventEmitter.emit("profile-update", "Nisarg", "Email");
    eventEmitter.emit("user-logout", "Nisarg");

    eventEmitter.emit("user-login", "Amit");
    eventEmitter.emit("user-purchase", "Amit", "Phone");

    eventEmitter.emit("summary");
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Fatal error:", error.message);
});
