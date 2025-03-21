import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../DonationPage.css"; // Add styles for better UI

const stripePromise = loadStripe("pk_live_51R4sXYG6MlVeHlPtDw1EGw6A4fri9UJHcGOXl01VV6Yg5rNHDevu7h3JVu97PbQMFt4EM7UfYVL7qs0GHialHobI00CzWSI5f1"); // Replace with your Stripe Public Key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      alert("Payment failed: " + error.message);
      setLoading(false);
      return;
    }

    // Send paymentMethod.id to backend to process the payment
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: 5000 }), // Example: $50.00 donation
    });

    const paymentResponse = await response.json();
    if (paymentResponse.success) {
      alert("Donation successful! Thank you for your support.");
    } else {
      alert("Payment failed: " + paymentResponse.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="donation-form">
      <h2>Support Our Mission</h2>
      <p>Enter your card details to donate.</p>
      <CardElement className="card-input" />
      <button type="submit" disabled={!stripe || loading} className="btn donate">
        {loading ? "Processing..." : "Donate Now"}
      </button>
    </form>
  );
};

const DonationPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default DonationPage;
