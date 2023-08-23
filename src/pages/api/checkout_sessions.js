const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await stripe.products.list();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NiHVgCJaelyWLeQPPOA4y7D",
            quantity: 1,
          },
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NiHbICJaelyWLeQSLaW0uqn",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }
  // else {
  //   res.setHeader("Allow", "POST");
  //   res.status(405).end("Method Not Allowed");
  // }
}
