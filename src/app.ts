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
  let contentType: string = req.header('Accept') ? req.header('Accept') : 'pdf';
  if (contentType === 'application/pdf') {
    contentType = 'pdf';
  } else if (contentType === 'image/png') {
    contentType = 'png';
  } else if (contentType === 'image/svg') {
    contentType = 'svg';
  } else {
    contentType = 'svg';
  } // otherwise, default to svg

  const specs = req.body;
  let view = await new vega.View(vega.parse(specs), { renderer: 'none' }).runAsync();

  switch (contentType) {
    case 'svg':
      let svg = await view.toSVG();
      res.send(svg);
      break;
    case 'pdf':
      let pdf = await view.toCanvas(undefined, { type: 'pdf', context: { textDrawingMode: 'glyph' } })
      pdf.createPDFStream().pipe(res);
      break;
    case 'png':
      let png = await view.toCanvas();
      png.createPNGStream().pipe(res);
  }
});


export default app;
