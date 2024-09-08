import Container from "../../components/ui/Container";
import AddInventory from "./AddInventory";
import ProductListCard from "./ProductListCard";

const InventoryManagement = () => {
  return (
    <div className="mt-28">
      <Container>
        <div className="flex justify-center ">
          <button  className="btn bg-primary hover:bg-green-600 text-white flex text-xl " onClick={()=>{
            const dialog = document.getElementById('my_modal_2') as HTMLDialogElement;
            dialog.showModal();
          }}>
            Add Inventory
          </button>
          <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
              <AddInventory/>
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
              <tr>
                <ProductListCard />
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default InventoryManagement;
