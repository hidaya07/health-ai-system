const express = require("express");

const app = express();

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});

// KEEP SERVER ALIVE (important)
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on http://127.0.0.1:" + PORT);
});

// EXTRA: prevent silent exit
process.on("exit", (code) => {
  console.log("Process exited with code:", code);