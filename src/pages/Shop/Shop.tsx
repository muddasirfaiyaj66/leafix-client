/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "../../components/ui/Container";
import { FormEvent, useState, useEffect } from "react";
import Select from "react-select";
import {
  customStyles,
  options,
  OptionType,
} from "../../utils/ProductSearchUtils/ProductSearchUtils";
import ProductsCard from "./ProductsCard";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateSearchQuery, updateSelectedOption } from "../../redux/features/searchSlice";
import { PacmanLoader } from "react-spinners";

const Shop = () => {
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const { query = '', category = null } = useAppSelector((state: any) => state.search || {});

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
    if (category) {
      setSelectedOption(category);
    }
  }, [query, category]);

  const queryParams = {
    category: selectedOption?.value || category?.value || "",
    search: searchTerm || query || "",
    page: currentPage,
    limit: itemsPerPage, 
  };

  const { data, error, isLoading } = useGetProductsQuery(queryParams, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // Pagination Handlers
  const handleNextPage = () => {
    if (data && currentPage < Math.ceil(data.meta.totalItems / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option);
    setCurrentPage(1); 
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSearchQuery(searchTerm));
    dispatch(updateSelectedOption(selectedOption));
    setCurrentPage(1); 
  };

  return (
    <div>
      <Container>
        <div className="pt-10 max-w-screen-md mx-auto lg:flex my-20">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center w-full">
              <label htmlFor="category" className="flex-shrink-0 mb-4 sm:mb-0">
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
                className="mt-2 sm:mt-0 sm:ml-2 h-14 w-full bg-white cursor-text rounded-md border py-4 pl-6 outline-none ring-secondary sm:border-0 focus:ring"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="btn my-2 lg:ml-5 btn-md py-5 flex justify-center items-center sm:my-0 bg-primary text-white hover:bg-green-800"
            >
              Search
            </button>
          </form>
        </div>

        {isLoading && <div><PacmanLoader color="#046425"/></div>}
        {error && <div className="text-3xl text-red-500 font-primary font-bold ml-4">Error fetching products</div>}

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 p-5 gap-5 lg:gap-10">
          {data?.products?.length ? (
            data.products.map((item:any) => (
              <ProductsCard item={item} key={item._id} />
            ))
          ) : (
            <div className="flex justify-center flex-1">
              <img src="/nodata.png" className='w-14' alt="" />
              <span className="text-3xl text-red-500 font-primary font-bold ml-4">
                No products found
              </span>
            </div>
          )}
        </div>

     
        <div className="flex space-x-1 justify-center bottom-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Prev
          </button>

          
          {data && [...Array(Math.ceil(data.meta.totalItems / itemsPerPage))].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={`min-w-9 rounded-full py-2 px-3.5 text-center text-sm transition-all shadow-sm ml-2 ${
                currentPage === index + 1
                  ? "bg-slate-800 text-white"
                  : "border-slate-300 text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(data?.meta.totalItems / itemsPerPage)}
            className="min-w-9 rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
