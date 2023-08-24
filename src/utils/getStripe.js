import { Stripe, loadStripe } from "@stripe/stripe-js";

const { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } = process.env;

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
