
export default class Product {

  id;

constructor(title, description, price, thumbnail, stock, code, category, status = true) {
  this.title = title;
  this.description = description;
  this.price = price;
  this.thumbnail = thumbnail;
  this.stock = stock;
  this.code = code;
  this.category = category;
  this.status = status;
}

setId(id) {
  this.id = id;
}


}