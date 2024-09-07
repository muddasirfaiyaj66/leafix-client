import { useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import { FormEvent, useState } from "react";
import Select from "react-select";
import {
  customStyles,
  options,
  OptionType,
} from "../../utils/ProductSearchUtils/ProductSearchUtils";
import ProductsCard from "./ProductsCard";
const Shop = () => {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Selected Option:", selectedOption);
    console.log("Search Term:", searchTerm);
    navigate("/shop");
  };
  return (
    <div className="">
        <Container>
     
     <div className="pt-10  mx-auto lg:max-w-screen-md my-20 ">
       <form
         onSubmit={handleSubmit}
         className=" flex w-full flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0"
       >
         <div className="flex flex-col sm:flex-row sm:items-center w-full">
           <label htmlFor="category" className="flex-shrink-0 mb-4 sm:mb-0 ">
             <Select
               id="category"
               options={options}
               styles={customStyles}
               value={selectedOption}
               onChange={handleSelectChange}
               placeholder="Select a Category"
             />
           </label>
           <input
             type="text"
             name="search"
             value={searchTerm}
             onChange={handleInputChange}
             className="mt-2 sm:mt-0 sm:ml-2 h-14  w-full bg-white cursor-text rounded-md border py-4 pl-6 outline-none ring-secondary sm:border-0  focus:ring"
             placeholder="Search"
           />
         </div>
         <button
           type="submit"
           className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary md:px-10 text-center align-middle text-base font-medium text-white outline-none ring-emerald-200 ring-offset-1 sm:absolute sm:right-0 sm:mt-0 sm:mr-1 sm:w-10 focus:ring"
         >
           Search
         </button>
       </form>
     </div>

   <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 p-5 gap-5 lg:gap-10">
   <ProductsCard ></ProductsCard>
   </div>
   
   </Container>
    </div>
  );
};

export default Shop;
