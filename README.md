# Деплой приложения на сервер с использованием pm2

- IP: 158.160.104.94
- frontend: https://another-one.ru
- backend: https://api.another-one.ru

Деплой frontend/backend (из соответствующей директории). Предварительно заполнив .env.deploy
```bash
pm2 deploy production
```

### backend .env.deploy example
```
NODE_ENV=production
PORT=3000
DEPLOY_USER=shvkn
DEPLOY_HOST=158.160.104.94
DEPLOY_PATH=/home/shvkn/mesto
DEPLOY_REF=origin/master
DEPLOY_REPO=git@github.com:shvkn/web-plus-pm2-deploy.git
JWT_SECRET='supersecret'
DB_ADDRESS=mongodb://localhost:27017/mestodb
CORS_ORIGINS=api.another-one.ru,another-one.ru
```

### frontend .env.deploy example
```
NODE_ENV=production
DEPLOY_USER=shvkn
DEPLOY_HOST=158.160.104.94
DEPLOY_PATH=/home/shvkn/mesto
DEPLOY_REF=origin/master
DEPLOY_REPO=git@github.com:shvkn/web-plus-pm2-deploy.git
API_BASE_URL=https://api.another-one.ru
```
