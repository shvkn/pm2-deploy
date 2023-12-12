// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  EXPRESS_PORT,
  DATABASE_NAME,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',
    env_env_production: {
      NODE_ENV: 'production',
      DATABASE_HOST,
      DATABASE_USER,
      DATABASE_PASSWORD,
      DATABASE_PORT,
      EXPRESS_PORT,
      DATABASE_NAME,
    },
  }],

  deploy: {
    production: {
      key: '~/.ssh/id_ed25519_ycloud_praktikum.pub',
      ssh_options: 'ForwardAgent=yes',
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/backend`,
      'post-deploy': `cd ${DEPLOY_PATH}/current/backend && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production`,
    },
  },
};
