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
    res.send("Vega pdf service");
} );

app.post("/", (req: Request, res: Response) => {
    console.log("Request received");
    let contentType: string = req.header("Accept") ?  req.header("Accept") : "pdf";
    if (contentType === "application/pdf") {
        contentType = "pdf";
    } else if (contentType === "image/png") {
        contentType = "png";
    } else if (contentType === "image/svg") {
        contentType = "svg";
    } else {
        contentType = "pdf";
    } // otherwise, default to pdf

    const specs = req.body.specs;

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
