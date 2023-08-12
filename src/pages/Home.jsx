import { RiDeleteBin2Fill } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalForm from "../components/Product/ModalForm";
export default function Home() {
  // NOTE - products is used to store the products from the API
  const [products, setProducts] = useState([]);
  // NOTE - showForm is used to show/hide the form
  const [showForm, setShowForm] = useState(false);
  // NOTE - selectedProduct is used to pass the product to the form
  const [selectedProduct, setSelectedProduct] = useState(null);

  // NOTE - fetchProducts is used to fetch the products from the API
  const fetchProducts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/product`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NOTE - Open the form with the selected product
  const openEditForm = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  // NOTE - useEffect is used to fetch the products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="bg-white">
      <ModalForm
        showForm={showForm}
        setShowForm={setShowForm}
        fetchProducts={fetchProducts}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>
          <div
            onClick={() => setShowForm(true)}
            className="hidden text-md font-medium text-indigo-600 hover:text-indigo-500 md:flex items-center gap-2 cursor-pointer"
          >
            Add new product
            <span aria-hidden="true">
              <FaPlus />
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 lg:h-72 xl:h-80 relative group">
                <img
                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                  alt={`image of ${product.name}}`}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute h-full w-full top-0 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div
                    onClick={() => {
                      openEditForm(product);
                    }}
                    className="text-white z-10 flex gap-2 justify-center cursor-pointer hover:opacity-70"
                  >
                    <RiEditBoxLine />
                    <span>Edit</span>
                  </div>
                  <div className="text-white z-10 flex gap-2 justify-center cursor-pointer hover:opacity-70">
                    <RiDeleteBin2Fill />
                    <span>Delete</span>
                  </div>
                  <div className="h-full w-full bg-black opacity-0 group-hover:opacity-80 absolute"></div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">{product.type}</p>
                </div>
                <p className="text-sm font-medium text-indigo-400">
                  $ {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm md:hidden">
          <div
            onClick={() => setShowForm(true)}
            className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-2 cursor-pointer"
          >
            Add new product
            <span aria-hidden="true">
              <FaPlus />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
