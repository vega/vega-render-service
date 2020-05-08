/* eslint-disable @typescript-eslint/no-var-requires */

import request from 'supertest';
import app from '../src/app';
export const vegaSpec = require('../vegaSpecs/bar.vg.json');
export const vegaliteSpec = require('../vegaSpecs/bar.vl.json');
export const specUseExternalLink = require('../vegaSpecs/specUseExternalLink.vg.json');

describe('API Request', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('should POST SVG for Vega Specs', async () => {
    const response = await request(app).post('/').send(vegaSpec);

    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('should POST SVG for VegaLite Specs', async () => {
    const response = await request(app).post('/').send(vegaliteSpec);

    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('should return 404 for external link', async () => {
    const response = await request(app).post('/').send(specUseExternalLink);
    expect(response.statusCode).toBe(404);
  })
});
