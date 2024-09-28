import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../redux/api/baseApi";
import { toast } from "sonner";
import { category } from "../../types/CategoryTpes";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const EditInventory = ({ _id }: { _id: string }) => {
  const { data, error, isLoading } = useGetProductByIdQuery(_id);
  const [updateProduct, { isSuccess }] = useUpdateProductMutation();

  const [defaultValues, setDefaultValues] = useState({
    title: "",
    category: "",
    image: "",
    price: 0,
    rating: 0,
    quantity: 0,
    description: "",
  });

  useEffect(() => {
    if (data) {
      setDefaultValues({
        title: data?.title || "",
        category: data?.category || "",
        image: data?.image || "",
        price: data?.price || 0,
        rating: data?.rating || 0,
        quantity: data?.quantity || 0,
        description: data?.description || "",
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDefaultValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDefaultValues((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const image = (form.elements.namedItem("image") as HTMLInputElement).files?.[0];

    let imgBbUrl = defaultValues.image;
    if (image) {
      const imageData = new FormData();
      imageData.append("image", image);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imgBbUrl = res?.data?.data?.display_url;
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Image upload failed. Please try again.");
        return;
      }
    }

    const inventoryData = {
      ...defaultValues,
      image: imgBbUrl,
    };

    await updateProduct({ id: _id, payload: inventoryData }).unwrap();

    if (isSuccess) {
      toast.success("Product updated successfully");
      const modal = document.getElementById(`my_modal_${_id}`) as HTMLDialogElement;
      modal.close();
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Edit Inventory</h3>
      <div className="modal-action flex justify-center items-center">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            const dialog = document.getElementById(`my_modal_${_id}`) as HTMLDialogElement;
            dialog.close();
          }}
        >
          ✕
        </button>
        <form method="modal" onSubmit={handleSubmit}>
          <div className="space-y-4 mb-4">
            <label className="input input-bordered flex items-center gap-2">
              Title :
              <input
                type="text"
                name="title"
                className="grow"
                placeholder="Title"
                value={defaultValues.title}
                onChange={handleInputChange}
              />
            </label>

            {/* Category Dropdown */}
            <label className="input input-bordered flex items-center gap-2">
              Category :
              <select
                name="category"
                className="grow"
                value={defaultValues.category}
                onChange={handleCategoryChange}
              >
                {Object.entries(category).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Description:</span>
              <textarea
                name="description"
                className="input input-bordered grow resize-none p-5 rounded-md"
                placeholder="Enter description"
                value={defaultValues.description}
                onChange={handleInputChange}
              />
            </label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered file-input-success w-full max-w-xs"
            />
            <label className="input input-bordered flex items-center gap-2">
              Price :
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                className="grow"
                placeholder="Price"
                value={defaultValues.price}
                onChange={handleInputChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Quantity :
              <input
                type="number"
                name="quantity"
                className="grow"
                min="0"
                step="0.01"
                placeholder="Quantity"
                value={defaultValues.quantity}
                onChange={handleInputChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Rating :
              <input
                type="number"
                name="rating"
                className="grow"
                min="0"
                step="0.01"
                placeholder="Rating"
                value={defaultValues.rating}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button className="btn btn-md bg-primary text-white hover:bg-green-700 hover:scale-110">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditInventory;
