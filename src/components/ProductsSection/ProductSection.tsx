import React, { useState, FormEvent } from "react";
import Container from "../ui/Container";
import Select from "react-select";

import { useNavigate } from "react-router-dom";
import {
  customStyles,
  options,
  OptionType,
} from "../../utils/ProductSearchUtils/ProductSearchUtils";
import { useAppDispatch } from "../../redux/hooks";
import { updateSearchQuery, updateSelectedOption } from "../../redux/features/searchSlice";

const ProductSection = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Selected Option:", selectedOption);
    console.log("Search Term:", searchTerm);
    dispatch(updateSearchQuery(searchTerm));
    dispatch(updateSelectedOption(selectedOption));
    navigate("/shop");
  };

  return (
    <div>
      <Container>
        <div className="flex justify-center items-center mt-10 p-5">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-medium">
            What are you <span className="text-primary font-bold">looking</span>{" "}
            for?
          </h1>
        </div>
        <div className="relative z-10 mx-auto lg:max-w-screen-md  pt-10 ">
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col justify-between rounded-lg border p-2 sm:flex-row sm:items-center sm:p-0"
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
      </Container>
    </div>
  );
};

export default ProductSection;
