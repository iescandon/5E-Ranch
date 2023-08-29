import { stripe } from "@/utils/getStripe";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const date_obj = Math.floor(new Date().getTime() / 1000);
      const session = await stripe.checkout.sessions.create({
        line_items: req.body.line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart?session_id={CHECKOUT_SESSION_ID}`,
        automatic_tax: { enabled: true },
        expires_at: date_obj + 1800,
        invoice_creation: { enabled: true },
        phone_number_collection: { enabled: true },
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
