import { spawn } from "child_process";
import path from "path";

console.log("\x1b[36m%s\x1b[0m", "🚀 Starting FitCat Full-Stack (Backend + Frontend)...");

// Start Backend on 4000
const backend = spawn("node", ["server.js"], {
  cwd: path.resolve("backend"),
  shell: true,
  stdio: "pipe",
});

backend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[33m[Backend 4000]\x1b[0m ${data}`);
});

backend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[31m[Backend Error]\x1b[0m ${data}`);
});

// Start Frontend on 5173
const frontend = spawn("npx", ["vite", "--port", "5173", "--host"], {
  cwd: path.resolve("frontend"),
  shell: true,
  stdio: "pipe",
});

frontend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[32m[Frontend 5173]\x1b[0m ${data}`);
});

frontend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[31m[Frontend Error]\x1b[0m ${data}`);
});

function cleanup() {
  console.log("\n\x1b[36m%s\x1b[0m", "Stopping FitCat services...");
  backend.kill();
  frontend.kill();
  process.exit();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

