import { RiDeleteBin2Fill } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import api from "../service/api.js";
import AddItemModal from "../components/product/AddItemModal.jsx";
import EditItemModal from "../components/product/EditItemModal.jsx";

export default function Home() {
  // NOTE - products is used to store the products from the API
  const [products, setProducts] = useState([]);
  // NOTE - this is used to show/hide the form
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // NOTE - selectedProduct is used to pass the product to the form
  const [selectedProduct, setSelectedProduct] = useState(null);

  // NOTE - fetchProducts is used to fetch the products from the API
  const fetchProducts = () => {
    api
      .get(`/product`)
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
    setShowEditModal(true);
  };

  //NOTE - Delete the product
  const deleteProduct = (id) => {
    api
      .delete(`/product/${id}`)
      .then((res) => {
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // NOTE - useEffect is used to fetch the products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="bg-white">
      <AddItemModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onSuccess={() => {
          fetchProducts();
        }}
      />
      <EditItemModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        onSuccess={() => {
          fetchProducts();
        }}
        selectedProduct={selectedProduct}
      />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>
          <div
            onClick={() => setShowAddModal(true)}
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
                  <div
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                    className="text-white z-10 flex gap-2 justify-center cursor-pointer hover:opacity-70"
                  >
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
            onClick={() => setShowAddModal(true)}
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
