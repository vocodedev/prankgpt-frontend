import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { BiCoffeeTogo } from "react-icons/bi";
import { Button } from "@chakra-ui/react";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || ""
);

const CoffeeButton = () => {
  const handleClick = async () => {
    const stripe = await stripePromise;
    const response = await fetch(
      `https://${process.env.REACT_APP_BACKEND_URL}/buy-coffee-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_data: {
            name: "Coffee for the Developer",
          },
          amount: 500, // $5.00 in cents
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
  return (
    <Button leftIcon={<BiCoffeeTogo />} size="sm" onClick={handleClick}>
      Buy us a coffee!
    </Button>
  );
};

export default CoffeeButton;
