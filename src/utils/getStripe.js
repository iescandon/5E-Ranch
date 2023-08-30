import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export const getInvoice = async (invoice_id) =>
  await stripe.invoices.retrieve(invoice_id);

export const getCharge = async (payment_id) =>
  await stripe.charges.retrieve(payment_id);

export const getSession = async (session_id) =>
  await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items"],
  });

export const expireSession = async (session_id) =>
  await stripe.checkout.sessions.expire(session_id);
