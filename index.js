const express = require( "express" );
const bodyParser = require("body-parser");
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

app.post('handle',function(request,response){
    // Check header type

    // Parse json specs
    // let query1=request.body.var1;
    // let query2=request.body.var2;

    //Load local pdf/image
    // ./node_modules/.bin/vg2pdf specs/vega.json plot.pdf

    //Send image to client

    //Clear image

});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

