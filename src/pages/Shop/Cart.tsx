import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/features/cartTotalItemSlice";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartItemReducer.products);

  // Fetch product details using the baseApi query
  const { data: products = [], isLoading, error } = useGetProductsQuery({
    page: 1,
    limit: 10,
    search: '',
    category: '',
  });

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => {
    const product = products?.products.find((p) => p._id === item.id); // Use the correct property name
    const productTotal = product ? product.price * item.quantity : 0;
    return total + productTotal;
  }, 0);

  // Handlers for changing quantity
  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <div className="min-h-screen mt-28">
      <Container>
        <div className="flex flex-col mx-auto p-6 space-y-4 sm:p-10">
          <h2 className="text-xl font-semibold">Your cart</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="flex flex-col divide-y dark:divide-gray-700">
                {cartItems.map((item) => {
                  const product = products?.products.find((p) => p._id === item.id);
                  if (!product) return null;
                  return (
                    <li key={item.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                          className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                          src={product.image || "https://via.placeholder.com/150"}
                          alt={product.title}
                        />
                        <div className="flex flex-col justify-between w-full pb-4">
                          <div className="flex justify-between w-full pb-2 space-x-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold sm:pr-8">{product.title}</h3>
                              <p className="text-sm dark:text-gray-400">{product.category}</p>
                              {/* Show quantity and add +/- buttons */}
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleDecreaseQuantity(item.id)}
                                  className="px-2 py-1 border rounded-md"
                                  disabled={item.quantity === 1} // Prevent reducing quantity below 1
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => handleIncreaseQuantity(item.id)}
                                  className="px-2 py-1 border rounded-md"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              {/* Show individual product price */}
                              <p className="text-lg font-semibold">
                                ${product.price} x {item.quantity} = ${(product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex text-sm divide-x">
                            <button
                              type="button"
                              className="flex items-center px-2 py-1 pl-0 space-x-1"
                              onClick={() => handleRemove(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="w-4 h-4 fill-current"
                              >
                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                <rect width="32" height="200" x="168" y="216"></rect>
                                <rect width="32" height="200" x="240" y="216"></rect>
                                <rect width="32" height="200" x="312" y="216"></rect>
                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                              </svg>
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="space-y-1 text-right">
                <p>
                  Total amount:
                  <span className="font-semibold"> ${totalAmount.toFixed(2)}</span>
                </p>
                <p className="text-sm dark:text-gray-400">
                  Not including taxes and shipping costs
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <Link to="/shop">
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-md border-secondary"
                  >
                    Back to shop
                  </button>
                </Link>
                <Link to="/checkout">
                  <button
                    type="button"
                    className="px-6 py-2 border rounded-md bg-primary text-white"
                  >
                    Continue to Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Cart;
