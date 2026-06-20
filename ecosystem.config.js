const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile(filePath = path.join(__dirname, ".env")) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function buildEnv(nodeEnv) {
  const adminPassword = process.env.ADMIN_PASSWORD || "";

  return {
    NODE_ENV: nodeEnv,
    ADMIN_PORT: process.env.ADMIN_PORT || "3007",
    ADMIN_USER: process.env.ADMIN_USER || "admin",
    ADMIN_PASSWORD: adminPassword,
  };
}

loadEnvFile();

module.exports = {
  apps: [
    {
      name: "qq-farm-bot",
      script: "pnpm",
      args: "dev:core",
      cwd: __dirname,
      interpreter: "none",
      instances: 1,
      autorestart: true, // 进程崩溃后自动重启
      watch: false,
      max_memory_restart: "1024M", // 每个实例内存上限
      env: buildEnv("development"),
      env_production: buildEnv("production"),
    },
  ],
};
