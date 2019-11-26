const express = require( 'express' );
const bodyParser = require('body-parser');
const child_process = require('child_process');
const fs = require('fs');
const stream = require('stream');
const crypto = require('crypto');
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send('Vega pdf service')
} );

app.post('/handle',function(req, res){
    // Check header type
    let contentType = req.header('Accept') ?  req.header('Accept') : 'pdf';
    if (contentType === 'application/pdf') {
        contentType = 'pdf';
    } else if (contentType === 'image/png') {
        contentType = 'png';
    } else if (contentType === 'image/svg') {
        contentType = 'svg';
    } else {
        contentType = 'pdf';
    } //otherwise, default to pdf 

    // Parse json specs
    const id = crypto.randomBytes(20).toString('hex');
    const specs = req.body.specs;
    fs.writeFileSync(`input_${id}.json`, JSON.stringify(specs), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });

    //Load local pdf/image
    child_process.execSync(`./node_modules/.bin/vg2${contentType} input_${id}.json plot_${id}.${contentType}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });


    //Send image to client
    let data = fs.readFileSync(`./plot_${id}.${contentType}`);

    //Clear image
    try {
        fs.unlinkSync(`./plot_${id}.${contentType}`);
        fs.unlinkSync(`./input_${id}.json`);
        //file removed
        res.send(data);
    } catch(err) {
        console.error(err);
    }
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

