import bodyparser from 'body-parser';
import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import * as vega from 'vega';
import vegaUrlParser from 'vega-schema-url-parser';
import { compile, TopLevelSpec } from 'vega-lite';

const app: Express = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Vega pdf service');
});

app.post('/', async (req: Request, res: Response) => {
  const contentType = req.header('Accept') ?? 'pdf';
  let specs: vega.Spec = req.body;
  const { library } = vegaUrlParser(specs.$schema);

  switch (library) {
    case "vega":
      break;
    case "vega-lite":
      specs = compile(specs as TopLevelSpec, {}).spec;
      break;
    default:
      return res.status(404).end("Invalid Schema, should be Vega or Vega-lite");
  }

  const view = new vega.View(vega.parse(specs), {
    renderer: 'none',
  });
  view.finalize();

  switch (contentType) {
    case 'application/pdf':
      const pdf = await view.toCanvas(undefined, {
        type: 'pdf',
        context: { textDrawingMode: 'glyph' },
      });
      pdf.createPDFStream().pipe(res);
      break;
    case 'image/png':
      const png = await view.toCanvas();
      png.createPNGStream().pipe(res);
    case 'image/vegaSvg':
    default:
      const svg = await view.toSVG();
      res.send(svg);
      break;
  }
});

export default app;
