# ARAHAN.md — Panduan Penuh Membina Web Terminal IDE (VS Code + CloudShell)

> OBJEKTIF: Membina aplikasi web terminal IDE di dalam GitHub Codespaces — gabungan UI VS Code
> (menu bar, activity bar, file explorer bersarang, ikon fail, command palette, split screen
> 4 skrin, copy/paste, editor Monaco) + fungsi CloudShell (shell sebenar melalui PTY,
> multi-distro Linux: Ubuntu, Debian, OpenSUSE, runtime: Node.js, Next.js, Wrangler Cloudflare,
> Git, Python, Go, Rust dan banyak lagi).

> CARA GUNA: Ikut fasa mengikut turutan. Setiap blok kod adalah FAIL PENUH — salin sahaja ke
> laluan yang dinyatakan. Semua arahan dijalankan di dalam terminal Codespace.

===============================================================================
KANDUNGAN
===============================================================================
Fasa 0  — Gambaran Architektur & Peta Repo
Fasa 1  — Senarai Tools & Provider (laman web rasmi)
Fasa 2  — Persediaan Persekitaran Codespace
Fasa 3  — Backend: Pakej & server.js (PTY + WebSocket)
Fasa 4  — Backend: API Fail, Pengecam Persekitaran, Git
Fasa 5  — Frontend: Bootstrap + Tema CSS (Dark+ VS Code)
Fasa 6  — Frontend: IPC WebSocket + Command Registry + App
Fasa 7  — Frontend: Terminal (xterm.js, copy/paste, search, WebGL)
Fasa 8  — Frontend: Toolbar, Tabs, Split 1/2/4 Skrin
Fasa 9  — Frontend: Menu Bar Penuh VS Code
Fasa 10 — Frontend: Command Palette + Quick Open + Keybindings
Fasa 11 — Frontend: File Explorer Bersarang + Ikon + Editor Monaco + Activity/Status Bar
Fasa 12 — Pasang Semua Bahasa & Runtime
Fasa 13 — Multi-Distro Linux (Ubuntu, Debian, OpenSUSE, Fedora, Arch)
Fasa 14 — Cloudflare Wrangler, Git & GitHub CLI
Fasa 15 — Deployment (Dockerfile, Compose, Codespaces)
Fasa 16 — Jadual Papan Kekunci Penuh
Fasa 17 — Senarai Semak "SEMUA BUTANG" (tiada satu pun tertinggal)
Fasa 18 — Penyelesaian Masalah (Troubleshooting)

===============================================================================
FASA 0 — GAMBARAN ARCHITEKTUR & PETA REPO
===============================================================================

ARCHITEKTUR SISTEM

┌────────────────────────────────── BROWSER ──────────────────────────────────┐
│  React 18 + Vite                                                            │
│  ├─ Menu Bar (File · Edit · Selection · View · Go · Run · Terminal · Help)  │
│  ├─ Activity Bar (Explorer · Search · Source Control · Debug · Extensions)  │
│  ├─ Side Bar    (File explorer bersarang + ikon fail, Search, Git, Settings)│
│  ├─ Editor Area (Monaco + tabs fail)                                        │
│  ├─ Terminal Panel (xterm.js — tabs, split 1/2/4, copy/paste, search)       │
│  ├─ Command Palette (Ctrl+Shift+P) + Quick Open (Ctrl+P)                    │
│  └─ Status Bar (shell aktif · cwd · runtime · status git · sambungan)       │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │  WebSocket /ws  (JSON messages)
                                   │  REST /api/fs · /api/env · /api/git
┌──────────────────────────────────▼──────────────────────────────────────────┐
│  Node.js 22 — Backend (Express + ws + node-pty)                             │
│  ├─ node-pty  → spawn shell SEBENAR (bash / zsh / fish / pwsh)              │
│  ├─ tmux      → session kekal walaupun browser ditutup                      │
│  ├─ fs API    → list/read/write/mkdir/rename/delete/search (explorer)       │
│  ├─ env API   → kenal pasti runtime yang dipasang (node, python, go, ...)   │
│  ├─ git API   → status, log, branches                                       │
│  └─ Docker    → container multi-distro (ubuntu · debian · opensuse ...)     │
└─────────────────────────────────────────────────────────────────────────────┘

PETA REPO PENUH (HASIL AKHIR)

web-terminal/
├── .devcontainer/
│   └── devcontainer.json
├── ARAHAN.md                    ← fail ini
├── .gitignore
├── package.json                 ← root: concurrently run client + server
├── server/
│   ├── package.json
│   ├── server.js                ← PTY + WebSocket + Express
│   └── routes/
│       ├── fs.js                ← API sistem fail (explorer, editor)
│       ├── env.js               ← API pengecam runtime
│       └── git.js               ← API git status/log/branches
└── client/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx              ← komposisi layout penuh
        ├── styles/theme.css     ← tema Dark+ VS Code
        ├── terminal/ipc.js      ← WebSocket multiplex client
        ├── commands/registry.js ← command registry (menu + palette + hotkey)
        └── components/
            ├── MenuBar.jsx
            ├── ActivityBar.jsx
            ├── SideBar.jsx
            ├── Explorer.jsx     ← folder/file bersarang
            ├── FileIcon.jsx     ← ikon mengikut jenis fail
            ├── SearchView.jsx
            ├── GitView.jsx
            ├── SettingsView.jsx
            ├── EditorTabs.jsx
            ├── EditorPane.jsx   ← Monaco editor + Ctrl+S save
            ├── TerminalPanel.jsx← panel bawah + split 1/2/4
            ├── TerminalPane.jsx ← satu xterm.js instance
            ├── CommandPalette.jsx
            ├── QuickOpen.jsx
            ├── ContextMenu.jsx
            └── StatusBar.jsx

===============================================================================
FASA 1 — SENARAI TOOLS & PROVIDER (LAMAN WEB RASMI)
===============================================================================

1.1 TERAS PROJEK

| Lapisan            | Tool               | Laman Web / Provider                                        |
|--------------------|--------------------|-------------------------------------------------------------|
| Emulator terminal  | xterm.js           | https://xtermjs.org — dipakai VS Code, Azure/AWS CloudShell |
| Addon fit/scale    | @xterm/addon-fit   | npm @xterm/addon-fit                                        |
| Render pantas      | @xterm/addon-webgl | npm @xterm/addon-webgl                                      |
| Cari dalam terminal| @xterm/addon-search| npm @xterm/addon-search                                     |
| Pautan & paste     | @xterm/addon-web-links | npm @xterm/addon-web-links                              |
| Shell sebenar (PTY)| node-pty           | https://github.com/microsoft/node-pty (Microsoft)           |
| WebSocket          | ws                 | https://github.com/websockets/ws                            |
| HTTP server        | Express            | https://expressjs.com                                       |
| Frontend framework | React 18           | https://react.dev                                           |
| Build tool         | Vite               | https://vitejs.dev                                          |
| Runtime backend    | Node.js 22         | https://nodejs.org                                          |
| Versi node berganda| nvm                | https://github.com/nvm-sh/nvm                               |

1.2 UI MACAM VS CODE

| Ciri                      | Tool                  | Laman                                                |
|---------------------------|-----------------------|------------------------------------------------------|
| Editor kod (enjin VS Code)| Monaco Editor         | https://microsoft.github.io/monaco-editor            |
| Editor React wrapper      | @monaco-editor/react  | https://github.com/suren-atoyan/monaco-react         |
| Ikon fail warna (rujukan) | VSCode Icons / Seti   | marketplace.visualstudio.com (vscode-icons-team)     |
| Ikon UI                   | lucide-react          | https://lucide.dev                                   |
| Layout panel drag (pilihan)| dockview             | https://dockview.dev                                 |
| Font terminal             | JetBrains Mono        | https://www.jetbrains.com/lp/mono                    |

1.3 MULTI-OS & ISOLASI

| Tool             | Laman                                     | Guna                                        |
|------------------|-------------------------------------------|---------------------------------------------|
| Docker           | https://www.docker.com                    | container Ubuntu/Debian/OpenSUSE per projek |
| tmux             | https://github.com/tmux/tmux              | session terminal kekal                      |
| gVisor (prod)    | https://gvisor.dev                        | sandbox kernel selamat                      |
| Firecracker (prod)| https://firecracker-microvm.github.io    | microVM ringan                              |

1.4 BAHASA, RUNTIME & CLOUD

| Tool                 | Laman                                                    |
|----------------------|----------------------------------------------------------|
| Node.js              | https://nodejs.org                                       |
| Next.js              | https://nextjs.org                                       |
| Cloudflare Wrangler  | https://developers.cloudflare.com/workers/wrangler       |
| Cloudflare dashboard | https://dash.cloudflare.com                              |
| Git                  | https://git-scm.com                                      |
| GitHub CLI (gh)      | https://cli.github.com                                   |
| Python               | https://www.python.org · https://pyenv.run               |
| Go                   | https://go.dev                                           |
| Rust                 | https://rustup.rs                                        |
| Deno                 | https://deno.com                                         |
| Bun                  | https://bun.sh                                           |
| OpenSUSE             | https://get.opensuse.org (image docker: opensuse/leap)   |
| Debian               | https://www.debian.org (debian:12)                       |
| Ubuntu               | https://ubuntu.com (ubuntu:24.04)                        |

===============================================================================
FASA 2 — PERSEDIAAN PERSEKITARAN CODESPACE
===============================================================================

Jalankan SEKALI SAHAJA di terminal Codespace:

    # 2.1 Tools sistem (compile node-pty + tmux + docker client)
    sudo apt-get update
    sudo apt-get install -y build-essential make g++ python3 tmux git curl wget unzip ca-certificates

    # Semak
    node -v && npm -v && tmux -V && git --version

2.1 STRUKTUR PROJEK

    mkdir -p web-terminal && cd web-terminal
    mkdir -p server/routes client/src/styles client/src/terminal client/src/commands client/src/components .devcontainer

2.2 DEVCONTAINER — buat fail .devcontainer/devcontainer.json:

    {
      "name": "Web Terminal IDE",
      "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
      "features": {
        "ghcr.io/devcontainers/features/docker-in-docker:1": {}
      },
      "postCreateCommand": "sudo apt-get update && sudo apt-get install -y tmux build-essential python3",
      "forwardPorts": [3000, 5173],
      "portsAttributes": {
        "3000": { "label": "Backend API + WS" },
        "5173": { "label": "Vite Frontend" }
      },
      "customizations": {
        "vscode": {
          "extensions": [
            "dbaeumer.vscode-eslint",
            "esbenp.prettier-vscode",
            "usernamehw.errorlens"
          ]
        }
      }
    }

2.3 .gitignore (root):

    node_modules/
    dist/
    .env
    *.log
    .DS_Store
    .wrangler/
    .next/

===============================================================================
FASA 3 — BACKEND: PAKEJ & server.js
===============================================================================

3.1 PASANG PAKEJ BACKEND

    cd server
    npm init -y
    npm pkg set type="module" name="terminal-server" version="1.0.0" \
      main="server.js" scripts.dev="node --watch server.js" scripts.start="node server.js"
    npm install express ws node-pty dotenv

> node-pty adalah modul native (dibina oleh Microsoft untuk VS Code). Ia perlu
> build-essential + python3 — sudah dipasang di Fasa 2.

3.2 server/server.js (FAIL PENUH)

    import "dotenv/config";
    import express from "express";
    import http from "node:http";
    import path from "node:path";
    import { fileURLToPath } from "node:url";
    import pty from "node-pty";
    import { WebSocketServer } from "ws";
    import fsRouter from "./routes/fs.js";
    import envRouter from "./routes/env.js";
    import gitRouter from "./routes/git.js";

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const ROOT = process.env.PROJECT_ROOT || path.resolve(__dirname, "..");
    const PORT = Number(process.env.PORT || 3000);

    const app = express();
    const server = http.createServer(app);
    const wss = new WebSocketServer({ noServer: true });

    app.use(express.json({ limit: "5mb" }));
    app.use("/api/fs", fsRouter(ROOT));
    app.use("/api/env", envRouter);
    app.use("/api/git", gitRouter(ROOT));
    app.use(express.static(path.join(__dirname, "../client/dist")));

    server.on("upgrade", (req, socket, head) => {
      const { pathname } = new URL(req.url, "http://localhost");
      if (pathname === "/ws") wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req));
      else socket.destroy();
    });

    wss.on("connection", (ws) => {
      const sessions = new Map(); // id -> pty process
      const send = (obj) => { if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(obj)); };

      function spawn(id, opts = {}) {
        const cols = Math.max(2, opts.cols ?? 80);
        const rows = Math.max(2, opts.rows ?? 24);
        const shell = opts.shell || process.env.SHELL || "bash";
        const cwd = opts.cwd || ROOT;
        const args = opts.tmuxSession ? ["new", "-A", "-s", opts.tmuxSession] : [];
        const term = pty.spawn(shell, args, {
          name: "xterm-256color",
          cols, rows, cwd,
          env: { ...process.env, TERM: "xterm-256color", COLORTERM: "truecolor", FORCE_COLOR: "1" },
        });
        term.onData((data) => send({ type: "data", id, data }));
        term.onExit(({ exitCode }) => {
          send({ type: "exit", id, exitCode });
          sessions.delete(id);
        });
        sessions.set(id, term);
        send({ type: "created", id, shell, cwd, pid: term.pid, tmux: opts.tmuxSession || null });
      }

      ws.on("message", (raw) => {
        let m;
        try { m = JSON.parse(raw); } catch { return; }
        switch (m.type) {
          case "create":
            if (!sessions.has(m.id)) spawn(m.id, m);
            break;
          case "input":
            sessions.get(m.id)?.write(m.data);
            break;
          case "resize":
            sessions.get(m.id)?.resize(Math.max(2, m.cols), Math.max(2, m.rows));
            break;
          case "kill": {
            const t = sessions.get(m.id);
            if (t) { try { t.kill(); } catch {} sessions.delete(m.id); }
            break;
          }
          case "list":
            send({ type: "list", ids: [...sessions.keys()] });
            break;
        }
      });

      ws.on("close", () => { for (const t of sessions.values()) { try { t.kill(); } catch {} } });
    });

    server.listen(PORT, () => {
      console.log(`API + WS  : http://localhost:${PORT}  (ws:/ws)`);
      console.log(`Projek root: ${ROOT}`);
    });

===============================================================================
FASA 4 — BACKEND: API FAIL, PENGECH PERSEKITARAN, GIT
===============================================================================

4.1 server/routes/fs.js (explorer + editor + carian) — FAIL PENUH

    import { Router } from "express";
    import path from "node:path";
    import fs from "node:fs/promises";
    import { execFile } from "node:child_process";
    import { promisify } from "node:util";

    const run = promisify(execFile);

    export default function fsRouter(ROOT) {
      const BASE = path.resolve(ROOT);
      const router = Router();

      const safe = (p = "/") => {
        const full = path.resolve(BASE, "." + path.posix.normalize("/" + p));
        if (full !== BASE && !full.startsWith(BASE + path.sep)) throw Object.assign(new Error("Path di luar projek"), { status: 400 });
        return full;
      };
      const SKIP = new Set(["node_modules", ".git", ".next", "dist", ".wrangler"]);

      router.get("/list", async (req, res) => {
        try {
          const dir = safe(req.query.path || "/");
          const dirents = await fs.readdir(dir, { withFileTypes: true });
          const items = [];
          for (const d of dirents) {
            if (SKIP.has(d.name)) continue;
            items.push({ name: d.name, dir: d.isDirectory(), path: path.posix.join(req.query.path || "/", d.name) });
          }
          items.sort((a, b) => (a.dir === b.dir ? a.name.localeCompare(b.name) : a.dir ? -1 : 1));
          res.json({ path: req.query.path || "/", items });
        } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.get("/tree", async (req, res) => {
        const depth = Math.min(Number(req.query.depth || 3), 8);
        async function walk(p, d) {
          const dir = safe(p);
          const dirents = await fs.readdir(dir, { withFileTypes: true });
          const nodes = [];
          for (const ent of dirents) {
            if (SKIP.has(ent.name)) continue;
            const child = { name: ent.name, dir: ent.isDirectory(), path: path.posix.join(p, ent.name) };
            if (ent.isDirectory() && d < depth) child.children = await walk(child.path, d + 1);
            nodes.push(child);
          }
          return nodes.sort((a, b) => (a.dir === b.dir ? a.name.localeCompare(b.name) : a.dir ? -1 : 1));
        }
        try { res.json(await walk("/", 1)); }
        catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.get("/read", async (req, res) => {
        try {
          const full = safe(req.query.path);
          const stat = await fs.stat(full);
          if (stat.size > 2 * 1024 * 1024) return res.status(413).json({ error: "Fail terlalu besar" });
          res.json({ path: req.query.path, content: await fs.readFile(full, "utf8") });
        } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.put("/write", async (req, res) => {
        try {
          const full = safe(req.body.path);
          await fs.mkdir(path.dirname(full), { recursive: true });
          await fs.writeFile(full, req.body.content ?? "", "utf8");
          res.json({ ok: true });
        } catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.post("/mkdir", async (req, res) => {
        try { await fs.mkdir(safe(req.body.path), { recursive: true }); res.json({ ok: true }); }
        catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.post("/rename", async (req, res) => {
        try { await fs.rename(safe(req.body.from), safe(req.body.to)); res.json({ ok: true }); }
        catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.delete("/delete", async (req, res) => {
        try { await fs.rm(safe(req.body.path), { recursive: true, force: true }); res.json({ ok: true }); }
        catch (e) { res.status(e.status || 500).json({ error: e.message }); }
      });

      router.get("/search", async (req, res) => {
        const q = String(req.query.q || "").trim();
        if (!q) return res.json([]);
        try {
          const base = safe(req.query.path || "/");
          const { stdout } = await run("grep", ["-rn", "-I", "--exclude-dir=node_modules", "--exclude-dir=.git", "--exclude-dir=dist", "--", q, base], { maxBuffer: 16 * 1024 * 1024 });
          const results = stdout.split("\\n").filter(Boolean).slice(0, 200).map((line) => {
            const [file, lineno, ...rest] = line.split(":");
            return { file: path.posix.join("/", path.relative(BASE, file)), line: Number(lineno), text: rest.join(":").trim().slice(0, 200) };
          });
          res.json(results);
        } catch (e) { if (e.code === 1) return res.json([]); res.status(500).json({ error: e.message }); }
      });

      return router;
    }

4.2 server/routes/env.js (kenal pasti runtime yang dipasang) — FAIL PENUH

    import { Router } from "express";
    import { exec } from "node:child_process";

    const TOOLS = [
      ["node", "--version"], ["npm", "--version"], ["npx", "--version"],
      ["pnpm", "--version"], ["yarn", "--version"], ["bun", "--version"], ["deno", "--version"],
      ["python3", "--version"], ["pip3", "--version"], ["poetry", "--version"],
      ["go", "version"], ["rustc", "--version"], ["cargo", "--version"],
      ["java", "-version"], ["mvn", "-version"],
      ["dotnet", "--version"], ["php", "--version"], ["ruby", "--version"],
      ["gcc", "--version"], ["g++", "--version"], ["cmake", "--version"],
      ["git", "--version"], ["gh", "--version"], ["docker", "--version"],
      ["tmux", "-V"], ["wrangler", "--version"], ["next", "--version"],
    ];

    export default Router().get("/", async (_req, res) => {
      const results = await Promise.all(TOOLS.map(([name, args]) =>
        new Promise((resolve) => {
          exec(`${name} ${args.join(" ")}`, { timeout: 5000 }, (err, stdout, stderr) => {
            resolve({ name, installed: !err, version: String(stdout || stderr).split("\\n")[0].trim().slice(0, 60) });
          });
        })
      ));
      res.json(results);
    });

4.3 server/routes/git.js — FAIL PENUH

    import { Router } from "express";
    import { execFile } from "node:child_process";
    import { promisify } from "node:util";

    const run = promisify(execFile);

    export default function gitRouter(ROOT) {
      const git = (args) => run("git", args, { cwd: ROOT, maxBuffer: 4 * 1024 * 1024 });
      const router = Router();

      router.get("/status", async (_req, res) => {
        try { const { stdout } = await git(["status", "--porcelain=v1", "-b"]); res.json({ output: stdout, repo: true }); }
        catch { res.json({ repo: false }); }
      });
      router.get("/log", async (_req, res) => {
        try { const { stdout } = await git(["log", "--oneline", "-n", "20"]); res.json({ output: stdout }); }
        catch (e) { res.status(500).json({ error: e.message }); }
      });
      router.get("/branches", async (_req, res) => {
        try { const { stdout } = await git(["branch", "-a"]); res.json({ output: stdout }); }
        catch (e) { res.status(500).json({ error: e.message }); }
      });

      return router;
    }

===============================================================================
FASA 5 — FRONTEND: BOOTSTRAP + TEME CSS (DARK+ VS CODE)
===============================================================================

5.1 BOOTSTRAP VITE + REACT + PAKEJ UI

    cd ../client
    npm init -y
    npm pkg set type="module" name="terminal-client" scripts.dev="vite --host 0.0.0.0" scripts.build="vite build" scripts.preview="vite preview"
    npm install react react-dom @xterm/xterm @xterm/addon-fit @xterm/addon-webgl @xterm/addon-search @xterm/addon-web-links @monaco-editor/react monaco-editor lucide-react
    npm install -D vite @vitejs/plugin-react

5.2 client/vite.config.js

    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";

    export default defineConfig({
      plugins: [react()],
      server: {
        host: "0.0.0.0",
        port: 5173,
        proxy: {
          "/api": "http://localhost:3000",
          "/ws": { target: "ws://localhost:3000", ws: true },
        },
      },
    });

5.3 client/index.html

    <!doctype html>
    <html lang="ms">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Web Terminal IDE</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>

5.4 client/src/main.jsx

    import React from "react";
    import { createRoot } from "react-dom/client";
    import App from "./App.jsx";
    import "@xterm/xterm/css/xterm.css";
    import "./styles/theme.css";

    createRoot(document.getElementById("root")).render(<App />);

=== TAMAT BAHAGIAN 1/3 ===
(Method: taip "sambung" dalam sembang untuk menerima Bahagian 2/3 — Fasa 5.5 theme.css, Fasa 6
(IPC + registry + App.jsx), Fasa 7 (TerminalPane), Fasa 8 (TerminalPanel + split 1/2/4),
Fasa 9 (MenuBar), Fasa 10 (CommandPalette + QuickOpen), Fasa 11 (Explorer, FileIcon, SearchView,
GitView, SettingsView, SideBar, ActivityBar, EditorTabs, EditorPane, StatusBar, ContextMenu).)
