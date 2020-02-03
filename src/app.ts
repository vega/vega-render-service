// @ts-ignore
import bodyparser from "body-parser";
import express, {Request, Response} from "express";
import {Express} from "express-serve-static-core";
import * as vega from "vega";

// @ts-ignore
const app: Express = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
const port: number = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Vega pdf service");
} );

app.post("/", (req: Request, res: Response) => {
    let contentType: string = req.header("Accept") ?  req.header("Accept") : "pdf";
    if (contentType === "application/pdf") {
        contentType = "pdf";
    } else if (contentType === "image/png") {
        contentType = "png";
    } else if (contentType === "image/svg") {
        contentType = "svg";
    } else {
        contentType = "svg";
    } // otherwise, default to svg

    const specs = req.body;

    new vega.View(vega.parse(specs), {renderer: "none"}).runAsync().then((view) => {
        switch (contentType) {
            case "svg":
                view.toSVG()
                    .then((svg) => {
                        res.send(svg);
                    })
                    .catch((err) => console.log(err));
                break;
            case "pdf":
                (view as any).toCanvas(undefined, {type: "pdf", context: {textDrawingMode: "glyph"}})
                    .then((canvas) => {
                        canvas.createPDFStream().pipe(res);
                    })
                    .catch((err) => console.log(err));
                break;
            case "png":
                view.toCanvas()
                    .then((canvas) => {
                        canvas.createPNGStream().pipe(res);
                    })
                    .catch((err) => console.log(err));
        }
    });
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

export default app;
