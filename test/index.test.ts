import request from 'supertest';
import app from '../src/app';
import { vegaliteSpec, vegaSpec, vegaSvg, vegaliteSvg } from './constants';

describe('API Request', () => {
  test('It should response the GET method', () => {
    return request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
  });

  test('should POST SVG for Vega Specs', () => {
      return request(app)
          .post('/')
          .send(vegaSpec)
          .then(response => {
              expect(response.statusCode).toBe(200);
              expect(response.text).toBe(vegaSvg);
          });
  });

    test('should POST SVG for VegaLite Specs', () => {
        return request(app)
            .post('/')
            .send(vegaliteSpec)
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe(vegaliteSvg);
            });
    });
});
