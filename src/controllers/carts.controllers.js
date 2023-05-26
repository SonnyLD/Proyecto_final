export default class CartsController {
  constructor({ CartService }) {
      this.service = CartService;
  }

  createCart = async (req, res) => {
      try {
          /*         const cartData = req.body; */
          const newCart = await this.service.createCart(/* cartData */);
          res.status(201).json({
              succees: true,
              message: 'New cart created.',
              cart: newCart,
          });
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  getCart = async (req, res) => {
      try {
          const { cartID } = req.params;
          const cart = await this.service.getCart(cartID);
          res.status(200).json({
              success: true,
              data: cart,
          });
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  deleteCart = async (req, res) => {
      try {
          const { cartID } = req.params;
          await this.service.deleteCart(cartID); // Returns an empty cart
          res.status(200).json({
              success: true,
              message: `Cart ${cartID} was emptied`,
          });
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  addProductToCart = async (req, res) => {
      try {
          const { cartID, productID } = req.params;
          const { quantity } = req.body;

          if (quantity <= 0) {
              res.status(400).json({
                  success: false,
                  message: `Invalid quantity. Must be a positive integer.`,
              });
          }
          const cart = await this.service.addProductToCart(
              cartID,
              productID,
              Number(quantity)
          );

          if (cart) {
              res.status(200).json({
                  success: true,
                  message: `Product ${productID} added to cart ${cart._id}`,
                  data: cart,
              });
          } else {
              res.status(404).json({
                  success: false,
                  message: `Product ${productID} not found.`,
              });
          }
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  deleteProductFromCart = async (req, res) => {
      try {
          const { cartID, productID } = req.params;

          const cart = await this.service.deleteProductFromCart(
              cartID,
              productID
          );
          if (cart) {
              res.status(200).json({
                  success: true,
                  message: `Product ${productID} deleted from cart ${cartID}`,
                  data: cart,
              });
          } else {
              res.status(404).json({
                  success: false,
                  message: `Product ${productID} not found in cart ${cartID}. Or cart ${cartID} not found.`,
              });
          }
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  updateCart = async (req, res) => {
      try {
          const { products } = req.body;
          const { cartID } = req.params;
          const updatedCart = await this.service.updateCart(cartID, products);
          if (updatedCart) {
              res.status(200).json({
                  success: true,
                  message: `Cart ${cartID} updated.`,
                  data: updatedCart,
              });
          } else {
              res.status(404).json({
                  success: false,
                  message: `Cart ${cartID} not found.`,
              });
          }
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  updateQuantity = async (req, res) => {
      try {
          const { cartID, productID } = req.params;
          const { quantity } = req.body;
          const updatedCart = await this.service.updateQuantity(
              cartID,
              productID,
              Number(quantity)
          );
          if (updatedCart) {
              res.status(200).json({
                  success: true,
                  message: `Product ${productID} quantity updated to ${quantity} in cart ${cartID}`,
                  data: updatedCart,
              });
          } else {
              res.status(404).json({
                  success: false,
                  message: `Product ${productID} not found in cart ${cartID}. Or cart ${cartID} not found.`,
              });
          }
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };

  getCartID = async (req, res) => {
      try {
          const cartID = req.user.cart._id;

          res.status(200).json({
              success: true,
              cartID,
          });
      } catch (error) {
          res.status(500).json({ Error: error.message });
      }
  };
}