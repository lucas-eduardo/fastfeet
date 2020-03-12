/* eslint-disable */
module.exports = {
  apps: [
    {
      name: 'FastFeet',
      script: './dist/server.js',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: ['node_modules'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
