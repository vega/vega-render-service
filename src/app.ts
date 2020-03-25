// @ts-ignore
import bodyparser from 'body-parser';
import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';
import * as vega from 'vega';

// @ts-ignore
const app: Express = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Vega pdf service');
});

app.post('/', async (req: Request, res: Response) => {
  const contentType = req.header('Accept') ?? 'pdf';

  const specs = req.body;
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
    case 'mage/png':
      const png = await view.toCanvas();
      png.createPNGStream().pipe(res);
    case 'image/svg':
    default:
      const svg = await view.toSVG();
      res.send(svg);
      break;
  }
});

export default app;
