import { FaCircleNotch } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { RiImageEditFill } from "react-icons/ri";
import { Fragment, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { serialize } from "object-to-formdata";
import { toast } from "sonner";
import api from "../../service/api.js";

export default function EditItemModal({
  showModal,
  setShowModal,
  onSuccess,
  selectedProduct,
}) {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    type: "Clothing",
    price: "",
    image: "",
  });
  // NOTE - Set product data to selectedProduct for editing
  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [selectedProduct]);
  // NOTE - Handle form input change based on input name then its value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // NOTE - Separate image change handler because it's a file
  const handleImageChange = (e) => {
    setProduct((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };
  //SECTION - Drag and drop image handler
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setProduct((prevData) => ({
        ...prevData,
        image: droppedFile,
      }));
    }
  };
  //!SECTION - End of drag and drop image handler

  // NOTE - Mutation to edit product
  const mutation = useMutation({
    mutationFn: (productData) =>
      api.put(`/product/${selectedProduct.id}`, productData),
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], (oldData) => {
        return {
          ...oldData,
          data: oldData.data.map((product) =>
            product.id === data.data.id ? data.data : product
          ),
        };
      });
      onSuccess();
      setShowModal(false);
      toast.success("Successfully updated product");
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Failed to update product | ${err}`);
    },
  });
  //NOTE - Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = serialize(product);
    mutation.mutate(productData);
  };
  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setShowModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 divide-y divide-gray-200"
                >
                  <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Edit product
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Please make sure all information is correct before
                          submitting them.
                        </p>
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              autoComplete="name"
                              required
                              onChange={handleChange}
                              value={product.name}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              required
                              value={product.description}
                              onChange={handleChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Type
                          </label>
                          <div className="mt-1">
                            <select
                              id="type"
                              name="type"
                              autoComplete="type"
                              required
                              onChange={handleChange}
                              value={product.type}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="Clothing">Clothing</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Food">Food</option>
                              <option value="Toys">Toys</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Price
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="price"
                              id="price"
                              autoComplete="price"
                              required
                              onChange={handleChange}
                              value={product.price}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product image
                          </label>
                          {product.image ? (
                            <div className="h-56 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80 relative group">
                              {selectedProduct && product.image.data ? (
                                <img
                                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                                  alt={`image of ${product.name}`}
                                  className="h-full object-cover object-center mx-auto"
                                />
                              ) : (
                                <img
                                  src={URL.createObjectURL(product.image)}
                                  alt={`image of ${product.name}`}
                                  className="h-full object-cover object-center mx-auto"
                                />
                              )}
                              <div className="absolute bg-black opacity-0 group-hover:opacity-80 w-full h-full top-0 flex items-center justify-center transition-all cursor-pointer p-4">
                                <div
                                  className={`mt-1 w-full h-full flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 opacity-0 group-hover:opacity-100 ${
                                    isDraggingOver ? "bg-gray-100" : ""
                                  }`}
                                  onDragOver={handleDragOver}
                                  onDragLeave={handleDragLeave}
                                  onDrop={handleDrop}
                                >
                                  <div className="space-y-1 text-center">
                                    <RiImageEditFill className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                      <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input
                                          id="file-upload"
                                          name="file-upload"
                                          type="file"
                                          className="sr-only"
                                          onChange={handleImageChange}
                                        />
                                      </label>
                                      <p className="pl-1">
                                        or drag and drop to change the image
                                      </p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 ${
                                isDraggingOver ? "bg-gray-100" : ""
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                            >
                              <div className="space-y-1 text-center">
                                <RiImageAddFill className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      onChange={handleImageChange}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowModal(false)}
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={mutation.isLoading}
                        type="submit"
                        className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {mutation.isLoading ? (
                          <FaCircleNotch className="animate-spin" />
                        ) : (
                          <span>Update</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
