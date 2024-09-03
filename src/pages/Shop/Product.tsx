import { useParams } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/features/cartTotalItemSlice";

const Product = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useAppDispatch()


  const handleCart = ()=>{
    const cartData = {
      id:id,
      total :1

    }
    dispatch(addToCart(cartData))

  }

  return (
    <div className="mt-28">
      <Container>
        <div className="flex flex-col lg:flex-row  gap-10 p-5 ">
          <div className="">
            <img src="https://i.postimg.cc/FRc7GBr5/133124.jpg" alt="" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-6xl">plant Title </h1>
            <p className="text-xl md:text-2xl  font-sans">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
              modi numquam commodi earum repellendus, quae quos. Temporibus
              aliquam saepe molestiae?
            </p>

            <p className="text-2xl">price </p>
            <p >Rating</p>

            <div className="flex  items-center gap-5 ">
              <div>
                <h1 className="text-xl">Quantity</h1>
                <div className="flex justify-center items-center gap-5">
                <div className="flex w-[5.5rem] justify-between  border border-slate-600">
                  <button className="text-xl ml-[2px] btn bg-transparent border-none btn-xs hover:bg-transparent">
                    +
                  </button>
                  <input
                    type="text"  defaultValue={0}
                    className=" rounded-sm flex justify-center  w-1/3"
                  />
                  <button className="text-xl mr-[2px] btn bg-transparent border-none btn-xs hover:bg-transparent">
                    -
                  </button>
                </div>

                <button onClick={handleCart} className="btn btn-xs  text-sm font-primary hover:bg-green-700 bg-primary text-white  border border-primary ">
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
