import fs from 'fs';
import * as path from 'path';
const spec = require('../vegaSpecs/bar.vg.json');

const svg = fs.readFileSync(path.join(__dirname, './bar.vg.svg'), "utf8");

export { spec, svg };
