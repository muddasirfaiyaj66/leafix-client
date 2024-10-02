import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAppDispatch } from "../../redux/hooks";
import { addToCartSuccess, TProduct } from "../../redux/features/cartTotalItemSlice";
import { useState } from "react";
import { useGetProductByIdQuery } from "../../redux/api/baseApi";
import Rating from "@mui/material/Rating";

const Product = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetProductByIdQuery(id!);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleCart = () => {
    if (!data) return;

    const product: TProduct = {
      _id: data._id,
      title: data.title,
      category: data.category,
      price: data.price,
      image: data.image,
      quantity,
      stock: data.quantity,
    };

    dispatch(addToCartSuccess(product));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load product details.</p>;

  const { price, rating, title, description, image } = data || {};

  return (
    <div className="my-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 p-5">
          <div>
            <img src={image} alt={title || "Product"} />
          </div>
          <div className="space-y-7">
            <h1 className="text-2xl md:text-3xl lg:text-6xl">
              {title || "Product Title"}
            </h1>
            <p className="text-xl md:text-2xl max-w-lg mx-auto font-sans">
              {description || "No description available"}
            </p>

            <p className="text-2xl">Price: ${price || 0}</p>
            <p>
              Rating:
              <Rating name="half-rating" value={rating || 0} precision={0.5} readOnly />
            </p>

            <div className="flex items-center gap-5">
              <div>
                <h1 className="text-xl">Quantity</h1>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex w-[5.5rem] justify-between border border-slate-600">
                    <button
                      onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
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
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
