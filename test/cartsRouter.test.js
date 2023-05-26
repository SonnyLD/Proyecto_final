import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const { expect } = chai;
const request = supertest(app);

describe('Carts Router', () => {
  describe('POST /carts', () => {
    it('should create a new cart', (done) => {
      request.post('/carts')
        .send({ user: '12345' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.user).to.equal('12345');
          done();
        });
    });
  });

  describe('PUT /carts/:cartID', () => {
    it('should update an existing cart', (done) => {
      request.put('/carts/12345')
        .send({ user: '67890' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.user).to.equal('67890');
          done();
        });
    });
  });

  describe('PUT /carts/:cartID/product/:productID', () => {
    it('should update the quantity of a product in a cart', (done) => {
      request.put('/carts/12345/product/67890')
        .send({ quantity: 5 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.products[0].product.toString()).to.equal('67890');
          expect(res.body.products[0].quantity).to.equal(5);
          done();
        });
    });
  });

  describe('POST /carts/:cartID/product/:productID', () => {
    it('should add a product to a cart', (done) => {
      request.post('/carts/12345/product/67890')
        .send({ quantity: 2 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.products).to.have.lengthOf(1);
          expect(res.body.products[0].product.toString()).to.equal('67890');
          expect(res.body.products[0].quantity).to.equal(2);
          done();
        });
    });
  });

  describe('DELETE /carts/:cartID', () => {
    it('should delete an existing cart', (done) => {
      request.delete('/carts/12345')
        .expect(204, done);
    });
  });

  describe('DELETE /carts/:cartID/product/:productID', () => {
    it('should delete a product from a cart', (done) => {
      request.delete('/carts/12345/product/67890')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('_id');
          expect(res.body.products).to.have.lengthOf(0);
          done();
        });
    });
  });

  describe('GET /carts/getCartID', () => {
    it('should get a new cart ID', (done) => {
      request.get('/carts/getCartID')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('cartID');
          done();
        });
    });
  });
});
