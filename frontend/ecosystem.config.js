require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
  API_BASE_URL
} = process.env;

module.exports = {
  apps: [{
    name: 'frontend',
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
      'pre-deploy-local': `scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/frontend`,
      'post-deploy': `cd ${DEPLOY_PATH}/current/frontend && npm ci && NODE_ENV=production REACT_APP_API_BASE_URL=${API_BASE_URL} npm run build`,
    }
  }
};
