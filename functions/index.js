const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// Function to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const amount = req.body.amount;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).send("Amount must be a positive number.");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Unable to create payment intent.");
  }
});

// Firebase Function Export
exports.api = functions.https.onRequest(app);
