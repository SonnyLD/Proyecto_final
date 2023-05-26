import Stripe from "stripe";
import config from "../config/db.js";

class StripePayment {
  constructor() {
    this.stripe = new Stripe(process.env.SECRET_KEY_STRIPE);
  }

  async createPaymentIntent(data) {
    const paymentIntent = await this.stripe.paymentIntents.create(data);
    return paymentIntent;
  }
}

export const stripePayment = new StripePayment();