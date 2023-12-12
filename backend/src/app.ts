import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import routes from './routes';

const { PORT = 3000, CORS_ORIGINS = 'http://localhost:3000' } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);

app.use(cors({
  credentials: true,
  origin(requestOrigin, callback) {
    if (requestOrigin?.length) {
      const { host } = new URL(requestOrigin);
      const whiteLists = CORS_ORIGINS.split(',').map((i) => i.trim());
      if (whiteLists.includes(host)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin domain ${host} not allowed by CORS policy`));
      }
    } else {
      callback(null, true);
    }
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
