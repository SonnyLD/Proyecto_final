import express from 'express';
import faker from 'faker';

const express = require('express');
const faker = require('faker');

const generateProduct = () => ({
  _id: faker.random.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.commerce.productDescription(),
  imageUrl: faker.image.imageUrl(),
  category: faker.commerce.department(),
});
const generateProductsResponse = () => {
  const products = [];

  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }

  return products;
};
const app = express();

app.get('/mockingproducts', (req, res) => {
  const productsResponse = generateProductsResponse();

  res.json(productsResponse);

});

module.exports = app;
