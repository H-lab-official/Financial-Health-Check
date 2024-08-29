// module.exports = {
//   apps: [
//     {
//       name: 'financial-health-check',
//       script: 'serve',
//       args: '-s dist',
//       env: {
//         PM2_SERVE_PATH: './dist',
//         PM2_SERVE_PORT: 4173, 
//         PM2_SERVE_SPA: 'true',
//         PM2_SERVE_HOMEPAGE: '/index.html'
//       }
//     }

//   ]
// };

module.exports = {
  apps: [
    {
      name: 'financial-health-check-fe',
      script: 'serve',
      args: '-s dist',
      instances: 'max', 
      exec_mode: 'cluster', 
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 4173, 
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      },
      env_production: {
        NODE_ENV: 'production',
        PM2_SERVE_PORT: 4173
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "./logs/pm2_fe_errors.log",
      out_file: "./logs/pm2_fe_out.log",
      merge_logs: true,
      max_restarts: 10,
      restart_delay: 5000,
      watch: process.env.NODE_ENV !== 'production' ? true : false
    }
  ]
};
