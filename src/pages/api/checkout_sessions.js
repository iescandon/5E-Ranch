import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // const body = JSON.parse(req.body);
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        // cancel_url: `${req.headers.origin}/cart/?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.status(201).json({ url: session.url });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
