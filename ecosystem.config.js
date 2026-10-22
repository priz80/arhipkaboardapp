module.exports = {
  apps: [
    {
      name: "arhipkaboardapp",
      script: "./server/index.js",
      cwd: "/var/www/pagelist_ru_usr/data/www/pagelist.ru/arhipka",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      error_file: "/var/www/pagelist_ru_usr/data/www/pagelist.ru/arhipka/logs/error.log",
      out_file: "/var/www/pagelist_ru_usr/data/www/pagelist.ru/arhipka/logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
