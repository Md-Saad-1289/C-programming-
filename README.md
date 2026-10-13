# Codebound: A Story-Driven C Programming Adventure Game

Codebound is an immersive, story-based educational web application that teaches C programming through authentic problem-solving and real code execution. Players explore ancient digital sanctums as the **Code Keeper**, guided by **ARIA** (Autonomous Reasoning Interface Archon), writing and compiling C code to unlock doors, power reactor cores, awaken cybernetic sentinels, and conquer the legendary **Silent Gate**.

---

## 🎮 Chapter 1: The Silent Gate (Playable Levels)

1. **The Ancient Terminal**
   - **Concepts:** C program anatomy, `#include <stdio.h>`, `int main()`, `return 0;`, `printf()`
   - **Mission:** Output `WELCOME CODE KEEPER`
   - **Visual Scene:** Hydraulic chamber gates disengage when the greeting is recognized.

2. **The Dead Power Core**
   - **Concepts:** Integer variable declaration, initialization, `%d` format specifier
   - **Mission:** Store 100 power units in an integer variable and output it
   - **Visual Scene:** Rotating magnetic stabilizer rings accelerate, and the crystalline reactor core illuminates.

3. **The Broken Generator**
   - **Concepts:** Arithmetic operators (`+`), multiple variables, expressions
   - **Mission:** Sum energy from Sub-Cell Alpha (40 units) and Sub-Cell Beta (60 units) to yield 100
   - **Visual Scene:** Plasma conduits bridge both cells into the central turbine flywheel, kickstarting the generator.

4. **The Sleeping Guardian**
   - **Concepts:** Comparison operators (`>=`), `if-else` branching
   - **Mission:** Read energy telemetry. If energy is $\ge 50$, output `Guardian Online`; otherwise output `Insufficient Energy`
   - **Visual Scene:** Sentinel golem's optical visor blazes emerald, saluting the Code Keeper.

5. **The Silent Gate — Boss Level**
   - **Concepts:** Interactive standard input (`scanf()`), pointer address operator (`&`), equality comparison (`==`)
   - **Mission:** Read access keycode. If keycode matches `1289`, output `Gate Opened`; otherwise output `Access Denied`
   - **Visual Scene:** The 4 heavy locking bolts retract, monolithic blast doors part, and Chapter 2 ("The Sunken Archives") is revealed.

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Code Editor:** Monaco Editor (`@monaco-editor/react`) for full C syntax highlighting
- **Animations:** Motion for React (`motion/react`), `canvas-confetti`
- **Backend & Sandbox:** Express on Node.js with Vite dev server middleware
- **Compiler Execution:**
  - **Piston Sandbox API (Default):** Zero-credential, secure, containerized sandbox executing GCC 10.2 with memory and CPU time limits.
  - **Judge0 CE / RapidAPI (Configurable):** Supports Judge0 via environment variables (`JUDGE0_API_KEY`, `JUDGE0_URL`).
- **Persistence:** LocalStorage (completed levels, unlocked chapters, XP, code history, achievements).

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install
```

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default settings in `.env`:
```env
# Server URL (automatically provided in AI Studio / Cloud Run)
PORT=3000

# Compiler engine: "piston" (default free sandbox, no API key needed) or "judge0"
COMPILER_PROVIDER="piston"

# Optional: Judge0 RapidAPI credentials
JUDGE0_API_KEY=""
JUDGE0_API_HOST="judge0-ce.p.rapidapi.com"

# Optional: Custom or self-hosted Judge0 CE URL
# JUDGE0_URL="https://ce.judge0.com"
```

### Development Server

Start the full-stack server (runs Express with Vite dev middlewares on port 3000):

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Deployment

```bash
# 1. Build the frontend client bundle
npm run build

# 2. Start the production server
npm start
```

---

## 🛡 Security & Sandboxed Compilation Architecture

- **Never runs arbitrary user C code in the host process**: All untrusted user code is executed in isolated container sandboxes with strict execution timeouts (4 seconds CPU, 12 seconds wall clock) and memory limits (128 MB).
- **Static security filtering**: Banned syscalls such as `system(`, `fork(`, `popen(` are rejected before submission.
- **Strict output validation**: Solvers are evaluated strictly on their compiled program's stdout against test suites—never by checking naive code substrings.

---

## 🏆 Game Features

- **Progressive Hint System:** Tier 1 Conceptual Direction $\rightarrow$ Tier 2 Syntax Tips $\rightarrow$ Tier 3 Code Blueprint.
- **Codex of the First Keepers:** In-game C reference manual covering syntax, I/O, operators, and compiler error diagnostics.
- **Codex Diagnostics:** Translates cryptic GCC compiler errors into friendly, actionable explanations.
- **Interactive Stdin Tester:** Test custom edge cases directly in the terminal panel.
- **Synthesized Retro Audio:** Web Audio engine for terminal clicks, compile signals, and victory fanfares.
- **Citadel Map:** Jump to any cleared chamber to replay or optimize code.
