import { StylesConfig } from "react-select";

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
    backgroundColor: state.isSelected ? "#046425" : "#000",
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
export const options: OptionType[] = [
  { value: "", label: "All" },
  { value: "option1", label: "Option1" },
  { value: "option2", label: "Option2" },
];
