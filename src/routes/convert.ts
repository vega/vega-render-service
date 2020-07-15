import express, { Request, Response } from 'express';
import SVGtoPDF from 'svg-to-pdfkit';
import PDFDocument from 'pdfkit';
import fs from 'fs';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (!req.body.svg) {
    return res.status(400).end('Must provide svg for rendering');
  }
  const { svg } = req.body;
  console.log('Svg received', svg);

  const doc = new PDFDocument();
  const stream = fs.createWriteStream('file.pdf');

  SVGtoPDF(doc, svg, 0, 0);
  stream.on('finish', () => {
    console.log(fs.readFileSync('file.pdf'));
  });

  doc.pipe(stream);
  doc.end();
  console.log('Finish writing pdf file');
});
