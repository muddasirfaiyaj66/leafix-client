import Container from "../../components/ui/Container";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import AddInventory from "./AddInventory";
import ProductListCard from "./ProductListCard";
import { PacmanLoader } from "react-spinners";
import { useState } from "react";

const InventoryManagement = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
  };

  const { data, error, isLoading } = useGetProductsQuery(queryParams);

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

  return (
    <div className="mt-28">
      <Container>
        <div className="flex justify-center ">
          <button
            className="btn bg-primary hover:bg-green-600 text-white flex text-xl "
            onClick={() => {
              const dialog = document.getElementById(
                "my_modal_2"
              ) as HTMLDialogElement;
              dialog.showModal();
            }}
          >
            Add Inventory
          </button>
          <dialog
            id="my_modal_2"
            className="modal modal-bottom sm:modal-middle"
          >
            <AddInventory />
          </dialog>
        </div>

        <div className="overflow-x-auto mt-10 flex ">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-xl">
                <th>Title</th>
                <th>Category</th>
                <th>Details</th>
                <th className="text-center lg:text-start lg:pl-14">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="text-center">
                    <PacmanLoader color="#046425" />
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={4} className="text-center">
                    Error fetching products
                  </td>
                </tr>
              )}
              {data?.products?.length > 0 ? (
                data.products.map((item) => (
                  <tr key={item._id}>
                    <ProductListCard item={item} />
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    <img src="/nodata.png" className="w-14 flex justify-center items-center" alt="" />
                    <span className="text-3xl text-red-500 font-primary font-bold ml-4">
                      No products found
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex space-x-1 justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Prev
          </button>

          {/* Page Number Buttons */}
          {data &&
            [...Array(Math.ceil(data.meta.totalItems / itemsPerPage))].map(
              (_, index) => (
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
              )
            )}

          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(data?.meta.totalItems / itemsPerPage)
            }
            className="min-w-9 rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default InventoryManagement;
