import bodyparser from 'body-parser';
import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import * as vega from 'vega';
import vegaUrlParser from 'vega-schema-url-parser';
import { compile, TopLevelSpec } from 'vega-lite';
import cors from 'cors';
import { registerFont } from 'canvas';
import { ALLOWED_URLS } from './constants';
import fs from 'fs';
import { URL } from 'url';

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

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<html><body><p>Vega render service. Learn more at <a href="https://github.com/vega/vega-render-service">github.com/vega/vega-render-service</a>.</p></body></html>',
    );
});

app.post('/', async (req: Request, res: Response) => {
  const contentType = req.header('Accept') ?? 'pdf';
  let spec = req.body;
  const { library } = vegaUrlParser(spec.$schema);

  switch (library) {
    case 'vega':
      break;
    case 'vega-lite':
      spec = compile(spec).spec;
      break;
    default:
      return res
        .status(400)
        .end('Invalid Schema, should be Vega or Vega-Lite.');
  }

  const loader = vega.loader({ mode: 'http' });
  loader.http = (uri: string, options: any): Promise<string> => {
    const parsedUri = new URL(uri);
    if (
      ALLOWED_URLS.every(
        (allowedUrl) => !parsedUri.hostname.includes(allowedUrl),
      )
    ) {
      res.status(400).send('External URI not allowed on this API');
      throw new Error('External data url not allowed');
    }
    return fetch(uri, {}).then((response) => {
      if (!response.ok) throw new Error(response.status + response.statusText);
      return response.text();
    });
  };

  const view = new vega.View(vega.parse(spec), {
    renderer: 'none',
    loader: loader,
  });
  view.finalize();
  switch (contentType) {
    case 'application/pdf':
      const pdf: HTMLCanvasElement = await view.toCanvas(undefined, {
        type: 'pdf',
        context: { textDrawingMode: 'glyph' },
      });
      const encodedPdf = (pdf as any).toBuffer();
      if (res.headersSent) {
        return;
      }
      res.status(200).send(encodedPdf);
      break;
    case 'image/png':
      const png: HTMLCanvasElement = await view.toCanvas();
      const encodedPng = (png as any).toBuffer();
      if (res.headersSent) {
        return;
      }
      res.status(200).send(encodedPng);
    case 'image/vegaSvg':
    default:
      const svg = await view.toSVG();
      if (res.headersSent) {
        return;
      }
      res.status(200).send(svg);
      break;
  }
});

export default app;
