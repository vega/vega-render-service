import bodyparser from 'body-parser';
import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import * as vega from 'vega';
import vegaUrlParser from 'vega-schema-url-parser';
import { compile, TopLevelSpec } from 'vega-lite';
import cors from 'cors';
import { registerFont } from 'canvas';

registerFont(__dirname + '/public/fonts/Roboto/Roboto.ttf', {
  family: 'Roboto',
});
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
      'Vega render service. Learn more at <a href="github.com/vega/vega-render-service">https://github.com/vega/vega-render-service/</a>.',
    );
});

app.post('/', async (req: Request, res: Response) => {
  const contentType = req.header('Accept') ?? 'pdf';
  let specs: vega.Spec = req.body;
  const { library } = vegaUrlParser(specs.$schema);

  switch (library) {
    case 'vega':
      break;
    case 'vega-lite':
      specs = compile(specs as TopLevelSpec, {}).spec;
      break;
    default:
      return res
        .status(404)
        .end('Invalid Schema, should be Vega or Vega-Lite.');
  }

  const view = new vega.View(vega.parse(specs), {
    renderer: 'none',
  });
  view.finalize();
  switch (contentType) {
    case 'application/pdf':
      const pdf: HTMLCanvasElement = await view.toCanvas(undefined, {
        type: 'pdf',
        context: { textDrawingMode: 'glyph' },
      });
      const encodedPdf = (pdf as any).toBuffer();
      res.status(200).send(encodedPdf);
      break;
    case 'image/png':
      const png: HTMLCanvasElement = await view.toCanvas();
      const encodedPng = (png as any).toBuffer();
      res.status(200).send(encodedPng);
    case 'image/vegaSvg':
    default:
      const svg = await view.toSVG();
      res.status(200).send(svg);
      break;
  }
});

export default app;
