import { useForm } from "react-hook-form";
import { REGEX } from "../constant/regex";
import clsx from "clsx";

function TestValidation() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Product data is valid and can be saved:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200 max-w-lg mx-auto"
    >
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
            {...register("name", { required: "Name cannot be empty" })}
            className={clsx(
              "block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
              errors.name ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
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
              errors.price ? "border-red-500" : "border-gray-300"
            )}
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span>Save</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default TestValidation;
