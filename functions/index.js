const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin: true})); // Allow requests from any origin
app.use(express.json());

// Function to create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const amount = req.body.amount;

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(400).send("Amount must be a positive number.");
    }

    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount
      currency: "usd", // Set your currency here (USD is just an example)
    });

    // Return the client secret from the PaymentIntent for the frontend to use
    res.send({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Unable to create payment intent.");
  }
});

// Ensure the Express app listens on the correct port
const PORT = process.env.PORT || 3000; // Use the PORT environment
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Firebase Function Export
exports.api = functions.https.onRequest(app);
