import app from '../src/app';
import * as chai from 'chai';
import {spec, svg} from './constants';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Request', () => {
    it('should GET /', () => {
        return chai.request(app).get('/')
            .then(res => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res).not.to.be.empty;
            })
    })

    it('should POST /', function () {
        return chai.request(app).post('/').send(spec)
            .then( res => {
                expect(res.text).not.to.be.empty;
                expect(res.text).to.equal(svg);
            })
    });
})
