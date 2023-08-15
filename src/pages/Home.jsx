import { FaPlus } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import api from "../service/api.js";
import AddItemModal from "../components/product/AddItemModal.jsx";
import EditItemModal from "../components/product/EditItemModal.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import { Toaster, toast } from "sonner";

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
    try {
      toast.promise(api.delete(`/product/${id}`), {
        loading: "Loading..",
        success: (data) => {
          fetchProducts();
          return "Successfully deleted product";
        },
        error: "Failed to delete product",
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete product");
    }
  };

  // NOTE - useEffect is used to fetch the products when the page loads
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="bg-white">
      <Toaster richColors position="top-center" />
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
            <ProductCard
              key={product.id}
              product={product}
              openEditForm={openEditForm}
              deleteProduct={deleteProduct}
            />
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
