/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js"; 
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { toast } from "sonner";
import { clearCart } from "../../redux/features/cartTotalItemSlice";
import Container from "../../components/ui/Container";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/Backend";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
}

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useAppSelector(
    (state) => state.cartItemReducer.products
  ) as CartItem[];

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    // Get Card Element
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are not entered.");
      return;
    }

    setIsProcessing(true);

    try {
      const { token, error } = await stripe.createToken(
        cardElement as StripeCardElement 
      );

      if (error) {
        setError(error.message || "Unknown error");
        setIsProcessing(false);
        return;
      }

      const response = await axios.post(`${backendUrl}/api/v1/checkout`, {
        token: token?.id,
        amount: totalAmount * 100,
        email,
        cartItems,
      });

      if (response.data.success) {
        const productUpdates = cartItems.map((item) => ({
          id: item._id,
          quantity: item.quantity,
          stock: item.stock,
        }));

        try {
          await Promise.all(
            productUpdates.map((item) =>
              axios.put(`${backendUrl}/api/v1/products/${item.id}`, {
                stock: item.stock - item.quantity,
              })
            )
          );

          toast.success("Payment successful!");
          dispatch(clearCart());
          setEmail("");
          setError(null);
          navigate("/");
        } catch (err: any) {
          setError(`Failed to update product quantities: ${err.message}`);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Payment error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen mt-28">
      <Container>
        <form onSubmit={handleCheckout}>
          <h2 className="text-xl font-semibold">Checkout</h2>

          {/* Email input */}
          <div className="mb-4 w-1/4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 px-4 py-2 border rounded-md w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Card Element */}
          <div className="w-1/2 mt-4 mb-2">
            <CardElement />
          </div>

          <button
            type="submit"
            className="px-6 py-2 btn mt-4 bg-primary text-white"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
          </button>

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>

        <div className="flex justify-end mt-4">
          <Link to="/cart">
            <button className="px-6 py-2 border rounded-md border-secondary">
              Back to Cart
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
