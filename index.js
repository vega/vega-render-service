const express = require( "express" );
const bodyParser = require("body-parser");
const child_process = require('child_process');
const fs = require('fs')
const stream = require('stream')


const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send('Vega pdf service')
} );

function helper() {
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
           exec(cmd, (error, stdout, stderr) => {
             if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
           });
       })
   }
}

// loadLocalPdf = (callback) => {
//     console.log("RUNNING COMMAND...")
//     execSync('./node_modules/.bin/vg2pdf input.json plot.pdf', (error, stdout, stderr) => {
//         callback()
//         if (error) {
//             console.error(`exec error: ${error}`);
//             return;
//         }
//         console.log(`stdout: ${stdout}`);
//         console.error(`stderr: ${stderr}`);
//     });

// }

app.post('/handle',function(req, res){
    console.log('Received request...');
    // Check header type

    // Parse json specs
    const specs = req.body.specs;
    fs.writeFileSync("input.json", JSON.stringify(specs), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });

    //Load local pdf/image

    child_process.execSync('./node_modules/.bin/vg2pdf input.json plot.pdf', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        const r = fs.createReadStream('./plot.pdf')
        const ps = new stream.PassThrough() 
        stream.pipeline(
            r,
            ps,
            (err) => {
                if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400); 
                }
        })
        ps.pipe(res) ;
        res.send("Success");
    });

    // const r = fs.createReadStream('./plot.pdf')
    // const ps = new stream.PassThrough() 
    // stream.pipeline(
    //     r,
    //     ps,
    //     (err) => {
    //         if (err) {
    //         console.log(err) // No such file or any other kind of error
    //         return res.sendStatus(400); 
    //         }
    // })
    // ps.pipe(res) 

    //Send image to client

    //Clear image

});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

