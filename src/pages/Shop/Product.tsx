import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart, TProduct } from "../../redux/features/cartTotalItemSlice";
import { useState } from "react";

const Product = () => {
  const { id } = useParams();
  console.log(id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleCart = () => {
    const product: TProduct = {
      id: id as string,
      quantity,
    };
    dispatch(addToCart(product));
  };

  return (
    <div className="my-20">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 p-5">
          <div className="">
            <img src="https://i.postimg.cc/FRc7GBr5/133124.jpg" alt="" />
          </div>
          <div className="space-y-7">
            <h1 className="text-2xl md:text-3xl lg:text-6xl">plant Title </h1>
            <p className="text-xl md:text-2xl max-w-lg mx-auto   font-sans">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
              modi numquam commodi earum repellendus, quae quos. Temporibus
              aliquam saepe molestiae? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Explicabo dolorem enim nemo delectus commodi
              cupiditate laborum quasi itaque voluptates voluptatibus
              repudiandae rem atque repellat, dolor unde, quibusdam quod nisi
              temporibus!
            </p>

            <p className="text-2xl">price </p>
            <p>Rating</p>

            <div className="flex items-center gap-5">
              <div>
                <h1 className="text-xl">Quantity</h1>
                <div className="flex justify-center items-center gap-5">
                  <div className="flex w-[5.5rem] justify-between  border border-slate-600">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
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
                    className="btn btn-sm  text-sm font-primary hover:bg-green-700 bg-primary text-white  border border-primary "
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
