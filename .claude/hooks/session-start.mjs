#!/usr/bin/env node
// SessionStart hook — ensure project dependencies are installed.
// Portable by design: runs in Claude Code on the web (Linux) and locally
// (Windows / macOS). Uses `node` (always on PATH) instead of a bash script so
// it does not depend on the platform shell — on Windows `bash` may resolve to
// WSL and break Windows paths.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const cwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();

// `pnpm install` is idempotent and fast when the lockfile is already satisfied.
// `shell: true` lets Windows resolve pnpm.cmd / pnpm.ps1 and Linux the pnpm bin.
const res = spawnSync("pnpm", ["install", "--prefer-offline"], {
  cwd,
  shell: true,
  encoding: "utf8",
});

// pnpm may exit non-zero only because an optional native build script (e.g.
// sharp) was skipped — harmless here since images use `unoptimized: true`.
// Trust the install if node_modules was actually populated.
const installed = existsSync(join(cwd, "node_modules", "next"));

if (res.status === 0 || installed) {
  process.stdout.write("pnpm install: dependencies ready.\n");
  process.exit(0);
}

process.stdout.write(
  `pnpm install failed:\n${(res.stderr || res.stdout || "").slice(-800)}\n`,
);
process.exit(res.status ?? 1);
