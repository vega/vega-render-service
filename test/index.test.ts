import request from 'supertest';
import app from '../src/app';
import { spec, svg } from './constants';

describe('API Request', () => {
  test('It should response the GET method', () => {
    return request(app)
        .get("/")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
  });

  test('should POST /', () => {
      return request(app)
          .post('/')
          .send(spec)
          .then(response => {
              expect(response.statusCode).toBe(200);
              expect(response.text).toBe(svg);
          });
  });
});
