import express, { Request, Response } from 'express';
import SVGtoPDF from 'svg-to-pdfkit';
import PDFDocument from 'pdfkit';
import fs from 'fs';


let router = express.Router();

router.get('/', (req: Request, res: Response) => {
    if (!req.body.svg) {
        return res.status(400).end('Must provide svg for rendering');
    }
    let { svg } = req.body;
    console.log('Svg received', svg);

    let doc = new PDFDocument();
    let stream = fs.createWriteStream('file.pdf');

    SVGtoPDF(doc, svg, 0, 0);
    stream.on('finish', () => {
        console.log(fs.readFileSync('file.pdf'));
    })

    doc.pipe(stream);
    doc.end();
    console.log('Finish writing pdf file');
});
