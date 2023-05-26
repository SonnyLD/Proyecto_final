import CartDTO from '../dto/cartDTO.js';

export default class CartServices {
    constructor({ CartRepository }) {
        this.dao = CartRepository;
    }

    createCart = async () => {
        try {
            const cart = await this.dao.create();
            return new CartDTO(cart);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getCart = async (cartID) => {
        try {
            const cart = await this.dao.getById(cartID);
            return new CartDTO(cart);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async deleteCart(cartID) {
        try {
            return await this.dao.delete();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // MEMO: probar --> unificar updateCart y updateQuantity

    async updateCart(cartID, cartData) {
        try {
            const updatedCart = await this.dao.update(
                { _id: cartID },
                { products: cartData }, // alternative { $set: { 'products': cartData } } ? set se emplea por default
                { new: true }
            );
            return new CartDTO(updatedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateQuantity(cartID, productID, quantity) {
        try {
            const updatedCart = await this.dao.update(
                { _id: cartID },
                { $set: { 'products.$[elem].quantity': quantity } },
                { arrayFilters: [{ 'elem.product': productID }], new: true }
            );
            return new CartDTO(updatedCart);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    addProductToCart = async (cartID, productID, quantity) => {
        try {
          const cart = await this.dao.getById(cartID);
      
          if (!cart) {
            throw new Error('Cart not found');
          }
      
          const productIsInCart = cart.products.some((prod) =>
            prod.product.equals(productID)
          ); // check if product is already in cart
      
          const product = await ProductModel.findById(productID); // Obtén el producto
          const user = await UserModel.findById(cart.owner); // Obtén el usuario dueño del carrito
      
          if (!product) {
            throw new Error('Product not found');
          }
      
          if (!user) {
            throw new Error('User not found');
          }
      
          // Verificar si el usuario es premium y el producto le pertenece
          if (user.role === 'premium' && product.owner.toString() === user._id.toString()) {
            throw new Error('No puedes agregar tu propio producto al carrito');
          }
      
          let updatedCart;
      
          if (productIsInCart) {
            // product is in cart?
            updatedCart = await this.dao
              .update(
                { _id: cartID, 'products.product': productID },
                { $inc: { 'products.$.quantity': quantity } },
                { new: true }
              )
              .lean();
          } else {
            updatedCart = await this.dao
              .update(
                { _id: cartID },
                {
                  $push: {
                    products: { product: productID, quantity },
                  },
                },
                { new: true }
              )
              .lean();
          }
      
          return new CartDTO(updatedCart);
        } catch (error) {
          throw new Error(error.message);
        }
      };

    deleteProductFromCart = async (cartID, productID) => {
        try {
            const cart = await this.dao.getById(cartID);

            if (!cart) {
                throw new Error('Cart not found');
            }

            const productIsInCart = cart.products.some((prod) =>
                prod.product.equals(productID)
            );

            if (productIsInCart) {
                const updatedCart = await this.dao.update(
                    { _id: cartID, 'products.product': productID },
                    { $pull: { products: { product: productID } } },
                    { new: true }
                );

                return new CartDTO(updatedCart);
            } else throw new Error('Product not found in cart');
        } catch (error) {
            throw new Error(error.message);
        }
    };
}
