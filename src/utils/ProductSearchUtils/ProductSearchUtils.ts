import { StylesConfig } from "react-select";
import { category } from "../../types/CategoryTpes";

export interface OptionType {
  value: string;
  label: string;
}

// Custom styles for react-select
export const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    borderColor: "#d1d5db",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#046425",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#000",
    borderRadius: "0.375rem",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#046425" : "#353935",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#046425",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
  }),
};
export const getCategoryOptions = (): OptionType[] => {
  const baseOptions: OptionType[] = [{ value: "", label: "All" }];

  const categoryOptions: OptionType[] = Object.entries(category).map(
    ([key, value]) => ({
      value: key,
      label: value,
    })
  );

  return [...baseOptions, ...categoryOptions];
};


export const options: OptionType[] = getCategoryOptions();