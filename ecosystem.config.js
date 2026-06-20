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
      env: {
        NODE_ENV: "development",
        ADMIN_PORT: "3007",
        ADMIN_USER: "admin",
        ADMIN_PASSWORD: "***REMOVED***",
      },
      env_production: {
        NODE_ENV: "production",
        ADMIN_PORT: "3007",
        ADMIN_USER: "admin",
        ADMIN_PASSWORD: "***REMOVED***",
      },
    },
  ],
};
