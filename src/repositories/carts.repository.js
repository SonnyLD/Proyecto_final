import BaseRepository from './base.repository.js';

export default class CartsRepository extends BaseRepository {
    constructor({ Cart }) {
        super(Cart);
    }

    // Overrides method from BaseRepository inr order to implement soft delete / empty cart
    delete = async (cartID) => {
        // Soft delete:
        const emptyCart = await this.model.findByIdAndUpdate(cartID, {
            $set: { products: [] },
        });
        // Hard delete: await CartModel.findByIdAndDelete(cartID).lean();

        return emptyCart;
    };

    // MEMO: maybe not necessary since it's possible with update method
    // addProductToCart(cartID, productID, quantity) {}

    // deleteProductFromCart(cartID, productID) {}
}
