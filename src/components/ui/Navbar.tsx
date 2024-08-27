
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const navlinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-secondary font-bold hover:text-primary font-primary"
            : "text-white font-bold hover:text-primary font-primary"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-secondary font-bold font-primary hover:text-primary"
            : "text-white font-bold hover:text-primary font-primary"
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "text-secondary font-bold font-primary hover:text-primary"
            : "text-white font-bold hover:text-primary font-primary"
        }
      >
        Cart
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gray-950 fixed w-full  z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-2">
        <a href="/" className="flex items-center justify-center  space-x-3 rtl:space-x-reverse">
          <img
            src="/leafixM.png"
            className="w-full h-[60px] lg:h-[80px] object-cover"
            alt="Leafix Logo"
          />
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="btn btn-md text-white bg-primary hover:bg-green-800 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary dark:hover:bg-green-800 dark:focus:ring-green-800"
          >
            Manage Inventory
          </button>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 bg-primary justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-primary focus:outline-none focus:ring-2   focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
            onClick={handleToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
            
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>

          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-bold border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-xl font">
            {navlinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
