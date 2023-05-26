const request = require('supertest');
const app = require('../src/app.js');
const chai = require('chai');
const expect = chai.expect;

describe('Products Router', () => {
  it('should get all products', (done) => {
    request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new product', (done) => {
    const product = {
      title: 'New Product',
      description: 'New Product Description',
      price: 10,
      thumbnail: 'https://example.com/image.jpg',
      stock: 10,
      code: 'ABC123',
      category: 'New Category',
      owner: '1234567890'
    };
    request(app)
      .post('/api/products')
      .send(product)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', 'New Product');
        done();
      });
  });

  it('should update a product', (done) => {
    const product = {
      title: 'Updated Product',
      description: 'Updated Product Description',
      price: 20,
      thumbnail: 'https://example.com/updated-image.jpg',
      stock: 5,
      code: 'XYZ789',
      category: 'Updated Category',
      owner: '0987654321'
    };
    request(app)
      .put('/api/products/1')
      .send(product)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title', 'Updated Product');
        done();
      });
  });

  it('should delete a product', (done) => {
    request(app)
      .delete('/api/products/1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        done();
      });
  });
});
