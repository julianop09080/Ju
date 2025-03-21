const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);

// Function to create a payment intent
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const amount = data.amount;

    // Ensure that amount is a valid number
    if (!amount || typeof amount !== "number" || amount <= 0) {
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Amount must be a positive number.",
      );
    }

    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    // Return the client secret to the frontend
    return {clientSecret: paymentIntent.client_secret};
  } catch (error) {
    console.error("Error creating payment intent:", error);

    // Handle errors properly and throw an appropriate error message
    throw new functions.https.HttpsError(
        "internal",
        `Unable to create payment intent: ${error.message}`,
    );
  }
});
