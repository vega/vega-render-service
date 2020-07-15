import bodyparser from 'body-parser';
import { registerFont } from 'canvas';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import fs from 'fs';
import { URL } from 'url';
import * as vega from 'vega';
import { compile } from 'vega-lite';
import vegaUrlParser from 'vega-schema-url-parser';
import { ALLOWED_URLS, VEGA_DATA_BASE_URL } from './constants';
import { router as indexRouter } from './routes/index';

if (fs.existsSync(__dirname + '/public/fonts/Roboto/Roboto.ttf')) {
  registerFont(__dirname + '/public/fonts/Roboto/Roboto.ttf', {
    family: 'Roboto',
  });
}

const app: Express = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/', indexRouter);
export default app;
