import { useState } from "react";

function TestValidation() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (product.name === "") {
      newErrors.name = "Name cannot be empty";
    }
    if (isNaN(product.price) || product.price === "") {
      newErrors.price = "Price must be a valid number";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Product data is valid and can be saved:", product);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
            name="name"
            id="name"
            autoComplete="name"
            onChange={handleChange}
            value={product.name}
            className={`block w-full rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
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
            type="text"
            name="price"
            id="price"
            autoComplete="price"
            onChange={handleChange}
            value={product.price}
            className={`block w-full rounded-md border ${
              errors.price ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-500">{errors.price}</p>
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
