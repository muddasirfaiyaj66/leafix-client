import { TbListDetails } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import EditInventory from "./EditInventory";
import Swal from "sweetalert2";
import { toast } from "sonner";
const ProductListCard = () => {
    const id = '555' ;

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              toast.success("Product Deleted successfully");
            }
          });
    }
  return (
    <>
      <td>
        <div className="flex items-center gap-3">
          
          <div className="lg:flex justify-between items-center gap-5 ">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src="https://i.postimg.cc/FRc7GBr5/133124.jpg"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
            <div className="font-bold">Snake Plant</div>
            
          </div>
        </div>
      </td>
      <td className=" text-xl">Indoor Plants</td>
      <td>
        <Link to="/product/5453">
          <button className="btn btn-ghost btn-xs lg:btn-md hover:bg-transparent hover:scale-110">
            <TbListDetails className="text-2xl lg:text-3xl text-primary" />
          </button>
        </Link>
      </td>
      <td>
        <div className="text-center lg:text-start">
          <button className="btn btn-ghost btn-xs lg:btn-md hover:bg-transparent hover:scale-110" onClick={()=>{
            const dialog = document.getElementById(`my_modal_${id}`) as HTMLDialogElement;
            dialog.showModal();
          }}>
            <CiEdit className=" text-blue-600 text-2xl lg:text-3xl " />
          </button>
          <dialog id={`my_modal_${id}`} className="modal modal-bottom sm:modal-middle">
          {EditInventory(id)}
          </dialog>
          <button onClick={handleDelete} className="btn btn-ghost btn-xs lg:btn-md hover:bg-transparent hover:scale-110">
            <MdDeleteOutline className="text-2xl lg:text-3xl text-red-500  " />
          </button>
        </div>
      </td>
    </>
  );
};

export default ProductListCard;
