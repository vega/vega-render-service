/* eslint-disable @typescript-eslint/no-var-requires */

import request from 'supertest';
import app from '../src/app';
export const vegaSpec = require('../vegaSpecs/bar.vg.json');
export const vegaliteSpec = require('../vegaSpecs/bar.vl.json');
export const specUseExternalLink = require('../vegaSpecs/specUseInvalidExternalLink.vg.json');
export const vegaSpecWithRelativeUrl = require('../vegaSpecs/specWithRelativeUrl.vg.json');
export const vegaliteSpecWithRelativeUrl = require('../vegaSpecs/specWithRelativeUrl.vl.json');
export const VEGA_GITHUB_RAW_DATA_BASE_URL = 'https://vega.github.io/vega-datasets/';

describe('API Request', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('should POST SVG for Vega Specs', async () => {
    const response = await request(app).post('/').send({ spec: vegaSpec });

    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('should POST SVG for VegaLite Specs', async () => {
    const response = await request(app).post('/').send({ spec: vegaliteSpec });

    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('should return error status for external link', async () => {
    const response = await request(app).post('/').send({ spec: specUseExternalLink });
    expect(response.statusCode).toBe(400);
  });

  test('should return error if no spec specified', async () => {
    const response = await request(app).post('/').send({ vegaSpec });
    expect(response.statusCode).toBe(400);
  });

  test('should render Vega external verified base URL correctly', async () => {
    const response = await request(app).post('/').send({
      spec: vegaSpecWithRelativeUrl,
      baseURL: VEGA_GITHUB_RAW_DATA_BASE_URL
    });
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('should render Vegalite external verified base URL correctly', async () => {
    const response = await request(app).post('/').send({
      spec: vegaliteSpecWithRelativeUrl,
      baseURL: VEGA_GITHUB_RAW_DATA_BASE_URL
    });
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatchSnapshot();
  });

  test('should render Vegalite external invalid base URL correctly', async () => {
    const response = await request(app).post('/').send({
      spec: vegaliteSpecWithRelativeUrl,
      baseURL: 'http://google.com'
    });
    expect(response.statusCode).toBe(400);
  });
});
