import { useEffect, useState } from "react";
import Container from "../../ui/Container";
import PopularCategoryCard from "./PopularCategoryCard";
import { Link } from "react-router-dom";

type PopularCategory = {
  id: string;
  name: string;
  img: string;
};

const PopularCategories = () => {
  const [data, setData] = useState<PopularCategory[] | null>(null);

  useEffect(() => {
    fetch("/popularCategory.json")
      .then((response) => response.json())
      .then((data: PopularCategory[]) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-4xl lg:text-6xl font-primary p-2 px-6 font-medium">
        Shop By Popular Categories
      </h1>

      <Link to={"/shop"}>
        <button className="text-2xl font-primary text-primary btn bg-transparent border-none shadow-none p-2 px-10 font-medium underline hover:scale-y-95 hover:bg-transparent">
          Shop All
        </button>
      </Link>

      <Container>
        <div className="grid mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap:5">
          {data?.map((payload) => (
            <PopularCategoryCard key={payload.id} payload={payload} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PopularCategories;
