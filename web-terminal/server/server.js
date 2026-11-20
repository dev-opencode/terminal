import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { spawn } from "node-pty";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const wss = new WebSocketServer({
  server,
  path: "/terminal",
});

wss.on("connection", (ws) => {
  const shell =
    process.platform === "win32"
      ? "powershell.exe"
      : process.env.SHELL || "/bin/bash";

  const pty = spawn(shell, [], {
    name: "xterm-256color",
    cols: 80,
    rows: 24,
    cwd: process.env.TERM_CWD || "/app",
    env: process.env,
  });

  pty.onData((data) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  });

  pty.onExit(() => {
    ws.close();
  });

  ws.on("message", (message) => {
    pty.write(message.toString());
  });

  ws.on("close", () => {
    pty.kill();
  });

  ws.on("error", () => {
    pty.kill();
  });
});

const port = Number(process.env.PORT) || 3000;

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
