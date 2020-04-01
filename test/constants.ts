import fs from 'fs';
import * as path from 'path';
const vegaSpec = require('../vegaSpecs/bar.vg.json');
const vegaliteSpec = require('../vegaSpecs/bar.vl.json');

const vegaSvg = fs.readFileSync(path.join(__dirname, './bar.vg.svg'), "utf8");
const vegaliteSvg = fs.readFileSync(path.join(__dirname, './bar.vl.svg'), "utf8");

export { vegaSpec, vegaliteSpec, vegaSvg, vegaliteSvg };
