module.exports = {
  apps: [
    {
      name: 'napp',
      port: '8688',
      instances: 'max',
      script: './.output1/server/index.mjs'
    }
  ]
};