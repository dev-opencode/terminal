<div align="center">
🖥️ Web Terminal IDE — Panduan & Kod Sumber (Bahagian 2/3)
Tema Dark+ VS Code · IPC WebSocket · Command Registry · xterm.js WebGL · Split Skrin 1/2/4
<!-- Badge & Ikon Platform, Bahasa & Alatan Pembangunan -->
<!-- Badge & Ikon Pembantu AI & CLI -->
</div>
📋 Ringkasan Kandungan & Ekosistem
Dokumen ini menghimpunkan kod penuh bagi Bahagian 2/3 pembangunan Web Terminal IDE berasaskan tema Dark+ VS Code, komunikasi WebSocket IPC, pengurusan arahan berpusat (Command Registry), integrasi terminal xterm.js, serta panel terminal dengan sokongan split 1 / 2 / 4 skrin.
Komponen / Alatan
Peranan dalam Projek
Ikon & Badge
Linux
Persekitaran pelayan, shell (bash, zsh, sh, fish, tmux)

HTML5
Struktur asas dokumen web & pemuatan #root

GitHub
Pengurusan repositori, kawalan versi & kolaborasi kod

VS Code
Rujukan reka bentuk UI & tema warna Dark+ (#1e1e1e)

ChatGPT
Bantuan penjanaan kod, nyahpepijat & semakan seni bina

Codex
Ejen pengekodan automatik & penyempurnaan fail penuh

Claude Code
Pembantu CLI pintar untuk suntingan & refactoring kod

GitHub Copilot
Cadangan kod masa nyata & pelengkap sintaks dalam editor

Gemini CLI
Pembantu terminal berasaskan AI untuk automasi arahan Linux


🎨 Fasa 5.5 — Tema Dark+ VS Code
Menetapkan pemboleh ubah CSS warna tema Dark+ VS Code, susun atur grid utama (Menu Bar, Activity Bar, Side Bar, Editor Area, Terminal Panel, Status Bar), gaya pokok folder bersarang, Command Palette, menu konteks, dan toast notifikasi.
⚡ Fasa 6 — IPC WebSocket + Command Registry + App
6.1 WebSocket Client & Multi-Session (⁠client/src/terminal/ipc.js⁠)
Menguruskan sambungan WebSocket automatik ke pelayan PTY, baris gilir mesej sementara sebelum sambungan dibuka, penciptaan sesi terminal (⁠openSession⁠), penghantaran input/resize/kill, serta pembantu HTTP REST ⁠api⁠.
6.2 Enjin Arahan (⁠client/src/commands/registry.js⁠)
Enjin pendaftaran arahan berpusat yang dikongsi oleh Menu Bar, Command Palette, dan pintasan papan kekunci (hotkey).
6.3 Komposisi Penuh Aplikasi (⁠client/src/App.jsx⁠)
Komponen induk React yang menggabungkan ⁠AppContext⁠, pendaftaran pintasan papan kekunci global, pengurusan fail terbuka, Command Palette, Quick Open, Toast, serta susun atur IDE lengkap.
💻 Fasa 7 — Terminal: xterm.js (Copy/Paste, Search, WebGL, Auto-Fit)
7.1 Komponen Sel Terminal (⁠client/src/components/TerminalPane.jsx⁠)
Menyediakan satu sesi terminal ⁠xterm.js⁠ lengkap dengan pemecut WebGL (dengan fallback automatik), ResizeObserver untuk auto-fit, carian teks terbina (⁠SearchAddon⁠), pautan boleh klik (⁠WebLinksAddon⁠), serta kawalan klik kanan / papan kekunci untuk salin & tampal.
🧩 Fasa 8 — Toolbar, Tabs & Split 1 / 2 / 4 Skrin
8.1 Panel Terminal Bawah & Split Grid (⁠client/src/components/TerminalPanel.jsx⁠)
Menguruskan berbilang tab terminal, pemilihan shell (⁠bash⁠, ⁠zsh⁠, ⁠sh⁠, ⁠fish⁠, ⁠tmux⁠), mod paparan 1 skrin, split kanan (⁠cols-2⁠), split bawah (⁠rows-2⁠), grid 4 skrin (⁠grid-4⁠), serta fungsi maximize dan tutup panel.
⏭️ Tamat Bahagian 2/3

<div align="center">
🖥️ Web Terminal IDE — Panduan & Kod Sumber (Bahagian 3/3)
Menu Bar VS Code · Command Palette & Quick Open · Explorer & Monaco Editor · Multi-Distro · Deployment & Lampiran
<!-- Badge & Ikon Platform, Bahasa & Alatan Pembangunan -->
<!-- Badge & Ikon Pembantu AI & CLI -->
</div>
📋 Ringkasan Kandungan (Bahagian 3/3)
Bahagian terakhir ini melengkapkan keseluruhan Web Terminal IDE daripada komponen antara muka (Fasa 9–11), pemasangan bahasa & runtime (Fasa 12), sokongan multi-distro Linux & ⁠tmux⁠ (Fasa 13), integrasi Cloudflare Wrangler / Git / GitHub CLI (Fasa 14), Deployment (Fasa 15), hinggalah ke senarai pintasan, senarai semak butang, penyelesaian masalah, dan lampiran pemasangan pantas (Fasa 16–18).
🧭 Fasa 9 — Menu Bar Penuh (Semua Menu VS Code)
🔎 Fasa 10 — Command Palette + Quick Open
10.1 Command Palette (⁠client/src/components/CommandPalette.jsx⁠)
10.2 Quick Open — ⁠Ctrl+P⁠ (⁠client/src/components/QuickOpen.jsx⁠)
📁 Fasa 11 — File Explorer Bersarang + Ikon + Editor + Activity / Status Bar
11.1 Ikon Mengikut Jenis Fail (⁠client/src/components/FileIcon.jsx⁠)
11.2 Explorer Bersarang + Context Menu (⁠client/src/components/Explorer.jsx⁠)
11.3 Search View (⁠client/src/components/SearchView.jsx⁠)
11.4 Git View (⁠client/src/components/GitView.jsx⁠)
11.5 Settings View (⁠client/src/components/SettingsView.jsx⁠)
11.6 SideBar (⁠client/src/components/SideBar.jsx⁠)
11.7 ActivityBar (⁠client/src/components/ActivityBar.jsx⁠)
11.8 EditorTabs (⁠client/src/components/EditorTabs.jsx⁠)
11.9 EditorPane — Monaco + Ctrl+S Save (⁠client/src/components/EditorPane.jsx⁠)
11.10 StatusBar (⁠client/src/components/StatusBar.jsx⁠)
11.11 ContextMenu (⁠client/src/components/ContextMenu.jsx⁠)
🛠️ Fasa 12 — Pasang Semua Bahasa & Runtime
Semua arahan dijalankan dalam terminal Codespace (base Ubuntu/Debian). Kesemuanya akan dikesan oleh panel Settings/Status melalui ⁠env⁠ API.
12.1 JavaScript / TypeScript / Node.js (⁠nvm⁠ multi-versi)
12.2 Next.js
12.3 Bun & Deno
12.4 Python (⁠venv⁠ + ⁠pip⁠ + ⁠poetry⁠)
12.5 Go
12.6 Rust
12.7 Java + Maven
12.8 C / C++
12.9 .NET, PHP, Ruby
12.10 Docker (Sahkan dalam Codespace)
🐧 Fasa 13 — Multi-Distro Linux (Ubuntu, Debian, OpenSUSE, Fedora, Arch)
Fungsi macam CloudShell: setiap distro dijalankan sebagai container Docker dari dalam Web Terminal IDE. Buka terminal baharu (butang ⁠＋⁠) dan jalankan:
Session Kekal Dengan ⁠tmux⁠
Dalam Web Terminal IDE, pilih shell ⁠tmux⁠ pada dropdown terminal — setiap tab mendapat session ⁠tmux⁠ izolasi (⁠wt-<tab>-<pane>⁠), jadi pekerjaan kekal walaupun browser ditutup.
☁️ Fasa 14 — Cloudflare Wrangler, Git & GitHub CLI
14.1 Wrangler (Cloudflare Workers / Pages / D1 / R2)
Laman rujukan: Cloudflare Wrangler Commands
14.2 Git (Konfigurasi Asas)
14.3 GitHub CLI (⁠gh⁠)
🚀 Fasa 15 — Deployment
15.1 ⁠package.json⁠ (Root — Jalankan Klien + Pelayan Serentak)
￼ Backend: ⁠http://localhost:3000⁠
￼ Frontend (dev, hot-reload): ⁠http://localhost:5173⁠
￼ Produksi (satu port): ⁠npm run build && npm start⁠ → ⁠http://localhost:3000⁠
15.2 ⁠Dockerfile⁠ (Build Imej Sendiri)
15.3 ⁠docker-compose.yml⁠
15.4 Pasang Pakej Root
⌨️ Fasa 16 — Jadual Papan Kekunci Penuh
Pintasan
Fungsi
Ctrl+Shift+P
Command Palette
Ctrl+P
Quick Open (pergi ke fail)
Ctrl+` 
Toggle panel terminal
Ctrl+Shift+` 
Terminal baharu
Ctrl+B
Toggle side bar
Ctrl+Shift+E
Explorer
Ctrl+Shift+F
Search
Ctrl+Shift+G
Source Control
Ctrl+,
Settings
Ctrl+S
Save fail aktif (Monaco)
Ctrl+Shift+C
Copy (terminal)
Ctrl+Shift+V
Paste (terminal)
Ctrl+F
Cari dalam terminal
↑ / ↓ / Enter
Navigasi command palette
Esc
Tutup palette / widget cari
Klik kanan (explorer)
Rename / Padam / Fail / Folder baharu
Klik kanan (terminal)
Copy (jika ada pilihan) → Paste

✅ Fasa 17 — Senarai Semak "Semua Butang" (Tiada Satu Tertinggal)
Menu Bar
￼ File: Fail Baharu, Folder Baharu, Save, Save All, Close Editor, Preferences → Settings
￼ Edit: Undo, Redo, Cut, Copy, Paste, Find
￼ Selection: Select All, Copy Selection, Paste
￼ View: Command Palette, Explorer, Search, Source Control, Settings, Toggle Side Bar
￼ Go: Go to File, Go to Line
￼ Run: ⁠npm run dev⁠, ⁠npm run build⁠, ⁠npm test⁠
￼ Terminal: New Terminal, Split Right, Split Down, Grid 4 Skrin, Satu Skrin, Clear, Kill, Toggle Panel, Maximize, tmux Session Kekal
￼ Help: Dokumentasi xterm.js, Dokumentasi VS Code, About
Komponen Antara Muka Lain
￼ Activity Bar: Explorer, Search, Source Control, Run & Debug, Extensions, Account, Settings, Toggle Sidebar.
￼ Explorer: folder bersarang expand/collapse, ikon fail ikut jenis, klik untuk buka editor, Fail Baharu, Folder Baharu, Rename, Delete, Muat semula.
￼ Search View: carian teks merentas projek, hasil klik → buka fail.
￼ Source Control View: status, log 20 commit terkini, senarai branches.
￼ Editor: tab pelbagai fail, tutup tab, Monaco syntax highlight (JS/TS/JSX/TSX/JSON/MD/CSS/HTML/PY/GO/RS/JAVA/PHP/RB/SH/YAML/SQL), minimap, ⁠Ctrl+S⁠ save, indikator "belum disimpan".
￼ Command Palette: semua arahan, navigasi keyboard, penapis teks.
￼ Quick Open (⁠Ctrl+P⁠): senarai semua fail projek, klik untuk buka.
￼ Status Bar: status sambungan WS, branch git, versi Node & Python, Ln/Col, UTF-8, LF, shell aktif, notifikasi.
￼ Run Menu: jalankan ⁠npm run dev⁠ / ⁠build⁠ / ⁠test⁠ terus ke terminal aktif.
Butang Panel Terminal (Lengkap)
Butang
Fungsi
＋
Terminal baharu
✕ (per-tab)
Tutup tab
dropdown shell
bash / zsh / sh / fish / tmux
▥
Split kanan — 2 skrin menegak
▤
Split bawah — 2 skrin mendatar
▦
Grid — 4 skrin serentak
▯
Kembali satu skrin
⤢
Maximize/minimize panel
—
Sembunyi/tunjuk panel
🗑
Kill tab aktif
⧉ (per-pane)
Copy pilihan (Ctrl+Shift+C)
📋 (per-pane)
Paste (Ctrl+Shift+V)
🔍 (per-pane)
Cari dalam terminal (Ctrl+F)
▣ (per-pane)
Pilih semua
🚫 (per-pane)
Bersihkan skrin
↑ ↓ ✕ (widget)
Cari sebelum / seterusnya / tutup
klik kanan (pane)
Copy jika ada pilihan; jika tiada → paste

🔧 Fasa 18 — Penyelesaian Masalah (Troubleshooting)
Masalah
Sebab
Penyelesaian
npm install node-pty gagal
Tiada toolchain C++
sudo apt-get install -y build-essential python3 make g++
Skrin hitam selepas buka term.
WS tak tersambung
Semak log server; pastikan proxy /ws dalam vite.config.js
ws 404
Path upgrade salah
Backend mesti betul dengan server.on("upgrade") pada /ws
Node versi lama dalam Codespace
Image lama
nvm install 22 && nvm alias default 22
Taip terganda-ganda
Dua sambungan WS
Setiap pane mesti satu id unik — segarkan halaman
docker: permission denied
Kumpulan docker
sudo usermod -aG docker $USER + log keluar/masuk
nvm hilang selepas reopen
PATH
Pastikan init nvm ada dalam ~/.bashrc
OpenSUSE zypper gagal
DNS container
docker restart container / semak DNS host
Monaco lambat
Bundle dev
Normal dalam dev; guna vite build untuk produksi
Port tak nampak
Codespaces
Tab Ports → forward 3000 & 5173

📦 Lampiran — Turutan Pantas Semua (Copy-Paste)
Selepas itu, salin semua fail kod dari Fasa 3 hingga 11 mengikut peta repo di Fasa 0.
<div align="center">
=== TAMAT ARAHAN.MD — JUMLAH KESELURUHAN 3 BAHAGIAN ===
</div>
