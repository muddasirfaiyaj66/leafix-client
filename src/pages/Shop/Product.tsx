import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart, TProduct } from "../../redux/features/cartTotalItemSlice";
import { useState } from "react";
import { useGetProductByIdQuery } from "../../redux/api/baseApi";
import Rating from "@mui/material/Rating";

const Product = () => {
  const { id } = useParams();
  
  // Use the query hook to fetch product by ID
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false); // Track success state
  const dispatch = useAppDispatch();

  // Handle adding product to the cart
  const handleCart = () => {
    if (!data) return; // Prevent adding undefined products
    const product: TProduct = {
      id: data._id, // Use data._id when it's available
      quantity,
    };
    dispatch(addToCart(product));
    setCartSuccess(true); // Show success message after adding to cart

    // Automatically hide the success message after 3 seconds
    setTimeout(() => setCartSuccess(false), 3000);
  };

  // Show loading or error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load product details.</p>;

  // Destructure data safely after checking it's available
  const { price, rating, title, description, image } = data || {};

  return (
    <div className="my-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 p-5">
          <div>
            <img
              src={image || "https://via.placeholder.com/150"} // Fallback if no image is available
              alt={title || "Product"}
            />
          </div>
          <div className="space-y-7">
            <h1 className="text-2xl md:text-3xl lg:text-6xl">{title || "Product Title"} </h1>
            <p className="text-xl md:text-2xl max-w-lg mx-auto font-sans">
              {description || "No description available"}
            </p>

            <p className="text-2xl">Price: ${price || 0} </p>
            <p>Rating:
              <Rating name="half-rating" defaultValue={rating} precision={0.5} readOnly />
            </p>

            <div className="flex items-center gap-5">
              <div>
                <h1 className="text-xl">Quantity</h1>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex w-[5.5rem] justify-between border border-slate-600">
                    <button
                      onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} // Prevent negative quantities
                      className="text-xl mr-[2px] btn bg-transparent border-none btn-xs hover:bg-transparent"
                    >
                      -
                    </button>
                    <p className="text-center text-xl">{quantity}</p>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-xl ml-[2px] btn bg-transparent border-none btn-xs hover:bg-transparent"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleCart}
                    className="btn btn-sm text-sm font-primary hover:bg-green-700 bg-primary text-white border border-primary"
                  >
                    Add to Cart
                  </button>
                </div>
                {/* Show success message when product is added */}
                {cartSuccess && (
                  <p className="text-green-600 mt-2">Product added to cart successfully!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
