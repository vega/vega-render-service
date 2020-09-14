/* eslint-disable @typescript-eslint/no-var-requires */

import request from 'supertest';
import app from '../src/app';
import { VEGA_DATA_BASE_URL } from '../src/constants';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

export const vegaSpec = require('../vegaSpecs/bar.vg.json');
export const vegaliteSpec = require('../vegaSpecs/bar.vl.json');
export const specUseExternalLink = require('../vegaSpecs/specUseInvalidExternalLink.vg.json');
export const vegaSpecWithRelativeUrl = require('../vegaSpecs/specWithRelativeUrl.vg.json');
export const vegaliteSpecWithRelativeUrl = require('../vegaSpecs/specWithRelativeUrl.vl.json');

expect.extend({ toMatchImageSnapshot });

describe('API Request', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/').set('Accept','image/png');
    expect(response.statusCode).toBe(200);
  });

  test('should POST SVG for Vega Specs', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({ spec: vegaSpec });
    expect(response.statusCode).toBe(200);
    const image = response.body;
    expect(image).toMatchImageSnapshot();
    
  });

  test('should POST SVG for VegaLite Specs', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({ spec: vegaliteSpec });

    expect(response.statusCode).toBe(200);
    const image = response.body;
    
    expect(image).toMatchImageSnapshot();
  });

  test('should return error status for external link', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({ spec: specUseExternalLink });
    expect(response.statusCode).toBe(400);
  });

  test('should return error if no spec specified', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({ vegaSpec });
    expect(response.statusCode).toBe(400);
  });

  test('should render Vega external verified base URL correctly', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({
      spec: vegaSpecWithRelativeUrl,
      baseURL: VEGA_DATA_BASE_URL,
    });
    expect(response.statusCode).toBe(200);
    const image = response.body;
    expect(image).toMatchImageSnapshot();
  });

  test('should render Vegalite external verified base URL correctly', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({
      spec: vegaliteSpecWithRelativeUrl,
      baseURL: VEGA_DATA_BASE_URL,
    });
    expect(response.statusCode).toBe(200);
    const image = response.body;
    expect(image).toMatchImageSnapshot();
  });

  test('should render Vegalite external invalid base URL correctly', async () => {
    const response = await request(app)
      .post('/')
      .set('Accept','image/png')
      .send({
      spec: vegaliteSpecWithRelativeUrl,
      baseURL: 'http://google.com',
    });
    expect(response.statusCode).toBe(400);
  });
});
