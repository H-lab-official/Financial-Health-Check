module.exports = {
    apps: [
      {
        name: 'financial-health-check',
        script: 'serve',
        args: 'build',
        env: {
          PM2_SERVE_PATH: './dist',
          PM2_SERVE_PORT: 5173,
          PM2_SERVE_SPA: 'true',
          PM2_SERVE_HOMEPAGE: '/index.html'
        }
      }
    ]
  };
  