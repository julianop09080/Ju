const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);
const express = require("express");

const app = express();

// Function to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const amount = req.body.amount;

    // Ensure that amount is a valid number
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).send("Amount must be a positive number.");
    }

    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    // Return the client secret to the frontend
    res.send({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Unable to create payment intent.");
  }
});

// Firebase function that triggers Express app
exports.api = functions.https.onRequest(app);
