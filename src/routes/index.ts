import express, { Request, Response } from 'express';
import * as vega from 'vega';
import { compile } from 'vega-lite';
import vegaUrlParser from 'vega-schema-url-parser';
import { URL } from 'url';
import { ALLOWED_URLS, VEGA_DATA_BASE_URL } from '../constants';

let router = express.Router();
// define a route handler for the default home page
router.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .send(
            '<html><body><p>Vega render service. Learn more at <a href="https://github.com/vega/vega-render-service">github.com/vega/vega-render-service</a>.</p></body></html>',
        );
});

router.post('/', async (req: Request, res: Response) => {
    const contentType = req.header('Accept') ?? 'pdf';
    if (!req.body.spec) {
        return res.status(400).end('Must provide Vega spec for render service');
    }
    let { spec } = req.body;
    const baseURL = req.body.baseURL || VEGA_DATA_BASE_URL;
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
    const originalLoad = loader.load.bind(loader);
    const originalHttp = loader.http.bind(loader);

    loader.http = async (uri: string, options: any): Promise<string> => {
        const parsedUri = new URL(uri);
        if (
            ALLOWED_URLS.every(
                (allowedUrl) => !parsedUri.hostname.includes(allowedUrl),
            )
        ) {
            res.status(400).send('External URI not allowed on this API');
            throw new Error('External data url not allowed');
        }
        return originalHttp(uri, options);
    };

    loader.load = async (url, options) => {
        try {
            if (options) {
                return await originalLoad(url, {
                    ...options,
                    ...{ baseURL },
                });
            }
            return await originalLoad(url, { baseURL });
        } catch {
            return await originalLoad(url, options);
        }
    };

    const view = new vega.View(vega.parse(spec), {
        renderer: 'none',
        loader: loader,
    });
    view.finalize();
    switch (contentType) {
        case 'application/pdf':
            const pdf = await view.toCanvas(undefined, {
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
            const png = await view.toCanvas();
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

export { router };