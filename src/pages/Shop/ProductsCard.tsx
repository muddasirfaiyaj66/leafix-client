import { Link } from "react-router-dom";

type ProductItem = {
  _id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: number;
};

interface ProductsCardProps {
  item: ProductItem;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ item }) => {
  const { _id, title, category, image, price, rating } = item;

  return (
    <div className="flex w-full h-[36rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
        <img src={image} className="w-full h-full object-cover" alt={title} />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
            {title}
          </h5>
          <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-orange-600"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {rating}
          </p>
        </div>
        <p className="block text-xl font-medium antialiased leading-relaxed text-gray-700">
          Category: {category}
        </p>
        <p className="text-xl">
          <span className="font-bold text-primary text-xl">Price: </span>{" "}
          {price} $
        </p>
      </div>
      <div className="p-6 pt-3">
        <Link to={`/product/${_id}`}>
          <button
            className="block w-full select-none rounded-lg bg-black py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:bg-primary hover:transition-all ease-in-out duration-300"
            type="button"
          >
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsCard;
