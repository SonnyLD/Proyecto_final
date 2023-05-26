import * as ProductService from "./products.services.js"

export async function createInvoice(idProduct, data) {
  const product = await ProductService.getProduct(idProduct);
}