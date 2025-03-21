const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);

// Function to create a payment intent
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  try {
    const amount = data.amount;

    // Create a payment intent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd", // You can change the currency if needed
    });

    // Return the client secret to the frontend
    return {clientSecret: paymentIntent.client_secret};
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new functions.https.HttpsError(
        "internal",
        "Unable to create payment intent",
    );
  }
});
