import { FaCircleNotch } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { RiImageEditFill } from "react-icons/ri";
import { Fragment, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { serialize } from "object-to-formdata";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { REGEX } from "../../constant/regex";
import clsx from "clsx";
import api from "../../service/api.js";

export default function AddItemModal({ showModal, setShowModal, onSuccess }) {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  // NOTE - Reset the form when the modal is closed
  useEffect(() => {
    reset({
      name: "",
      description: "",
      type: "Clothing",
      price: null,
      image: null,
    });
  }, [showModal]);
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
      setValue("image", e.dataTransfer.files);
    }
  };
  //!SECTION - End of drag and drop image handler
  // NOTE - Mutation to add new product
  const { mutateAsync: addItemMutation, isLoading } = useMutation({
    mutationFn: (product) => {
      const formData = serialize(product);
      return api.post(`/product`, formData);
    },
    onSuccess: (data) => {
      // NOTE - Optimistic update to the "products" query
      queryClient.setQueryData(["products"], (oldData) => ({
        ...oldData,
        data: [...oldData.data, data.data],
      }));
    },
  });
  //NOTE - Form submit handler
  const onSubmit = (product) => {
    product.image = product.image?.[0];
    toast.promise(addItemMutation(product), {
      loading: "Loading..",
      success: (data) => {
        onSuccess();
        setShowModal(false);
        return `Successfully added new product | ${data.data.name}`;
      },
      error: (err) => {
        console.log(err);
        return `Failed to add new product | ${err}`;
      },
    });
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
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8 divide-y divide-gray-200"
                >
                  <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Add new product
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
                              id="name"
                              autoComplete="name"
                              {...register("name", {
                                required: "Name cannot be empty",
                              })}
                              className={clsx(
                                "block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                                errors.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              )}
                            />
                            {errors.name && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.name.message}
                              </p>
                            )}
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
                              rows={3}
                              {...register("description", {
                                required: "Description cannot be empty",
                              })}
                              className={clsx(
                                "block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                                errors.description
                                  ? "border-red-500"
                                  : "border-gray-300"
                              )}
                            />
                            {errors.description && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.description.message}
                              </p>
                            )}
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
                              autoComplete="type"
                              {...register("type", {
                                required: "Type cannot be empty",
                              })}
                              className={clsx(
                                "block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                                errors.type
                                  ? "border-red-500"
                                  : "border-gray-300"
                              )}
                            >
                              <option value="Clothing">Clothing</option>
                              <option value="Electronics">Electronics</option>
                              <option value="Food">Food</option>
                              <option value="Toys">Toys</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.type && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.type.message}
                              </p>
                            )}
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
                              type="number"
                              id="price"
                              autoComplete="price"
                              {...register("price", {
                                required: "Price cannot be empty",
                                pattern: {
                                  value: REGEX.NUMBER,
                                  message: "Price must be a valid number",
                                },
                                valueAsNumber: true,
                              })}
                              className={clsx(
                                "block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
                                errors.price
                                  ? "border-red-500"
                                  : "border-gray-300"
                              )}
                            />
                            {errors.price && (
                              <p className="mt-2 text-sm text-red-500">
                                {errors.price.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Product image
                          </label>
                          {watch("image") ? (
                            <div className="h-56 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80 relative group">
                              <img
                                src={URL.createObjectURL(watch("image")?.[0])}
                                className="h-full object-cover object-center mx-auto"
                              />
                              <div className="absolute bg-black opacity-0 group-hover:opacity-80 w-full h-full top-0 flex items-center justify-center transition-all cursor-pointer p-4">
                                <div
                                  className={clsx(
                                    "mt-1 w-full h-full flex items-center justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 opacity-0 group-hover:opacity-100",
                                    errors.image
                                      ? "border-red-500"
                                      : "border-gray-300",
                                    isDraggingOver ?? "bg-gray-100"
                                  )}
                                  onDragOver={handleDragOver}
                                  onDragLeave={handleDragLeave}
                                  onDrop={handleDrop}
                                >
                                  <div className="space-y-1 text-center">
                                    <RiImageEditFill className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                      <label
                                        htmlFor="image"
                                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                      >
                                        <span>Upload a file</span>
                                        <input
                                          id="image"
                                          type="file"
                                          className="sr-only"
                                          {...register("image", {
                                            validate: (value) => {
                                              if (!value?.[0]) return true;
                                              if (
                                                value[0].type !== "image/png" &&
                                                value[0].type !== "image/jpg" &&
                                                value[0].type !== "image/jpeg"
                                              ) {
                                                return "Image must be a valid image file";
                                              }
                                              if (value[0].size > 10000000) {
                                                return "Image must be less than 10MB";
                                              }
                                              return true;
                                            },
                                          })}
                                        />
                                      </label>
                                      <p className="pl-1">
                                        or drag and drop to change the image
                                      </p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      PNG, JPG, GIF up to 10MB
                                    </p>
                                    {errors.image && (
                                      <p className="mt-2 text-sm text-red-500">
                                        {errors.image.message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={clsx(
                                "mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6",
                                isDraggingOver ?? "bg-gray-100"
                              )}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                            >
                              <div className="space-y-1 text-center">
                                <RiImageAddFill className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    htmlFor="image"
                                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="image"
                                      type="file"
                                      className="sr-only"
                                      {...register("image", {
                                        validate: (value) => {
                                          if (!value?.[0]) return true;
                                          if (
                                            value[0].type !== "image/png" &&
                                            value[0].type !== "image/jpg" &&
                                            value[0].type !== "image/jpeg"
                                          ) {
                                            return "Image must be a valid image file";
                                          }
                                          if (value[0].size > 10000000) {
                                            return "Image must be less than 10MB";
                                          }
                                          return true;
                                        },
                                      })}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG or JPG up to 10MB
                                </p>
                                {errors.image && (
                                  <p className="mt-2 text-sm text-red-500">
                                    {errors.image.message}
                                  </p>
                                )}
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
                        disabled={isLoading}
                        type="submit"
                        className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {isLoading ? (
                          <FaCircleNotch className="animate-spin" />
                        ) : (
                          <span>Save</span>
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
