import { loadStripe } from "@stripe/stripe-js";

export const createSubscription = async (userPhoneNumber: string) => {
  const stripe = await loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
  );
  const response = await fetch(
    `https://${process.env.REACT_APP_BACKEND_URL}/buy-subscription-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: userPhoneNumber,
      }),
    }
  );
  const session = await response.json();
  const result = await stripe?.redirectToCheckout({
    sessionId: session.id,
  });

  if (result?.error) {
    console.error("Error redirecting to checkout:", result.error.message);
  }
};

export const cancelSubscription = async (userPhoneNumber: string) => {
  const response = await fetch(
    `https://${process.env.REACT_APP_BACKEND_URL}/cancel-subscription`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: userPhoneNumber,
      }),
    }
  );
  const result = await response.json();
  return result.success || false;
};
