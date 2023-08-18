import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../service/api.js";
import AddItemModal from "../components/product/AddItemModal.jsx";
import EditItemModal from "../components/product/EditItemModal.jsx";
import ProductCard from "../components/product/ProductCard.jsx";
import { toast } from "sonner";

export default function Home() {
  // NOTE - this is used to show/hide the form
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // NOTE - selectedProduct is used to pass the product to the form
  const [selectedProduct, setSelectedProduct] = useState(null);

  // NOTE - Fetch all products using react-query
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery(["products"], {
    queryFn: () => api.get("/product"),
    select: (data) => data.data,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-5xl">Loading...</div>
      </div>
    );
  }

  // NOTE - Open the form with the selected product
  const openEditForm = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  //NOTE - Delete the product
  const deleteProduct = (id) => {
    toast.promise(api.delete(`/product/${id}`), {
      loading: "Loading..",
      success: (data) => {
        refetch();
        return "Successfully deleted product";
      },
      error: (err) => {
        console.log(err);
        return `Failed to delete product | ${err}`;
      },
    });
  };
  return (
    <div className="bg-white">
      <AddItemModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        onSuccess={() => {
          refetch();
        }}
      />
      <EditItemModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        onSuccess={() => {
          refetch();
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
