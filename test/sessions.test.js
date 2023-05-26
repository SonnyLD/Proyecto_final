import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const { expect } = chai;
const request = supertest(app);

describe('Passport Router', () => {
  describe('GET /sessions/failed', () => {
    it('should return a 401 status code', (done) => {
      request.get('/sessions/failed')
        .expect(401, done);
    });
  });

  describe('POST /sessions/signup', () => {
    it('should create a new user', (done) => {
      request.post('/sessions/signup')
        .send({
          email: 'test@example.com',
          password: 'test1234',
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.email).to.equal('test@example.com');
          done();
        });
    });
  });

  describe('POST /sessions/login', () => {
    it('should log in an existing user', (done) => {
      request.post('/sessions/login')
        .send({
          email: 'test@example.com',
          password: 'test1234',
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.email).to.equal('test@example.com');
          done();
        });
    });
  });

  describe('POST /sessions/logout', () => {
    it('should log out the current user', (done) => {
      request.post('/sessions/logout')
        .expect(200, done);
    });
  });
});
