#!/bin/bash
set -euo pipefail

# Only run dependency setup in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Ensure the pnpm version pinned by the repo is available.
corepack enable >/dev/null 2>&1 || true

# Install dependencies. `pnpm install` (not `--frozen-lockfile`) keeps the
# install resilient and lets the container cache node_modules after the hook.
pnpm install
