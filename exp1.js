const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

const eventCount = {
  "user-login": 0,
  "user-logout": 0,
  "user-purchase": 0,
  "profile-update": 0
};

eventEmitter.on("user-login", (username) => {
  eventCount["user-login"]++;
  console.log(`User logged in: ${username}`);
});

eventEmitter.on("user-logout", (username) => {
  eventCount["user-logout"]++;
  console.log(`User logged out: ${username}`);
});

eventEmitter.on("user-purchase", (username, item) => {
  eventCount["user-purchase"]++;
  console.log(`User ${username} purchased ${item}`);
});

eventEmitter.on("profile-update", (username, field) => {
  eventCount["profile-update"]++;
  console.log(`User ${username} updated ${field}`);
});

eventEmitter.on("summary", () => {
  console.log("\n📊 EVENT SUMMARY REPORT");
  console.log("----------------------");
  for (let event in eventCount) {
    console.log(`${event}: ${eventCount[event]} time(s)`);
  }
});

eventEmitter.emit("user-login", "Nisarg");
eventEmitter.emit("user-purchase", "Nisarg", "Laptop");
eventEmitter.emit("profile-update", "Nisarg", "Email");
eventEmitter.emit("user-logout", "Nisarg");

eventEmitter.emit("user-login", "Amit");
eventEmitter.emit("user-purchase", "Amit", "Phone");

eventEmitter.emit("summary");
