import * as chai from 'chai';
import app from '../src/app';
import { spec, svg } from './constants';
import 'mocha';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;


describe('API Request', () => {
  it('should GET /', async () => {
    const res = await chai.request(app).get('/');
    chai.expect(res.status).to.equal(200);
    chai.expect(res).not.to.be.empty;
    expect(res.status).to.equal(200);
  });

  it('should POST /', async () => {
    const res = await chai.request(app).post('/').send(spec);
    chai.expect(res.text).not.to.be.empty;
    chai.expect(res.text).to.equal(svg);
  });
});
