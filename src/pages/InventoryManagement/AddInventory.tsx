import { FormEvent } from "react";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddInventory = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement)
      .value;
    const image = (form.elements.namedItem("image") as HTMLInputElement)
      .files?.[0];
    const price = parseFloat(
      (form.elements.namedItem("price") as HTMLInputElement).value
    );
    const rating = parseFloat(
      (form.elements.namedItem("rating") as HTMLInputElement).value
    );
    const quantity = parseInt(
      (form.elements.namedItem("quantity") as HTMLInputElement).value
    );
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    )?.value;

    if (!image) {
      alert("Please upload an image.");
      return;
    }

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

      const imgBbUrl: string = res?.data?.data?.display_url;

      const inventoryData = {
        title,
        category,
        image: imgBbUrl,
        price,
        rating,
        quantity,
        description,
      };

      console.log(inventoryData);
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Image upload failed. Please try again.");
    }


    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.close();
  };
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Add a new inventory</h3>

      <div className="modal-action flex justify-center items-center">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            const dialog = document.getElementById(
              "my_modal_2"
            ) as HTMLDialogElement;
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
                placeholder=" Title"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Category :
              <input
                type="text"
                name="category"
                className="grow"
                placeholder="Category"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Description:</span>
              <textarea
                name="description"
                className="input input-bordered grow resize-none p-5 rounded-md"
                placeholder="Enter description"
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
                min='0'
                step='0.01'
                className="grow"
                placeholder="Price"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Quantity :
              <input
                type="number"
                name="quantity"
                className="grow"
                min='0'
                step='0.01'
                placeholder=" Quantity"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Rating :
              <input
                type="number"
                name="rating"
                className="grow"
                min='0'
                step='0.01'
                placeholder="Rating"
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

export default AddInventory;
