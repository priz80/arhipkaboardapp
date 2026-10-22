module.exports = {
  apps: [
    {
      name: "boardposterapp",
      script: "./server/index.js",
      cwd: "/var/www/boardposterapp",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "/var/www/boardposterapp/logs/error.log",
      out_file: "/var/www/boardposterapp/logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
