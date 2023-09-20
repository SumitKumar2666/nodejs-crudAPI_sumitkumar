// ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'Nodejs_SumitKumar', 
      script: 'app.js', 
      instances: 'max', // 'max' to utilize all CPU cores
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production', 
      },
    },
  ],
};
