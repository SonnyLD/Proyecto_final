export default class ProductDTO {
    constructor(product) {
        this.id = product._id || product.id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.quantity = product.quantity;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock = product.stock;
    }
}
