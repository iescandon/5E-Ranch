import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getSession = async (session_id) =>
  await stripe.checkout.sessions.retrieve(session_id);

export const expireSession = async (session_id) =>
  await stripe.checkout.sessions.expire(session_id);

export const getProducts = async (query) => {
  let products;
  if (query) {
    products = await stripe.products.search({ query });
  } else {
    products = await stripe.products.search();
  }
  return products;
};

export const getProduct = async (product_id) =>
  await stripe.products.retrieve(product_id);

export const getPrices = async () => await stripe.prices.list();

export const getPrice = async (price_id) =>
  await stripe.prices.retrieve(price_id);
