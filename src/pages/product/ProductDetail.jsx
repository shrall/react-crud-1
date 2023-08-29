import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../service/api";
import EditItemModal from "../../components/product/EditItemModal";

function ProductDetail() {
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.get(`/product/${id}`).then((res) => res.data),
    initialData: () => {
      return queryClient
        .getQueryData(["products"])
        ?.data.find((product) => product.id === id);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-5xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <EditItemModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        onSuccess={refetch}
        selectedProduct={product}
      />
      <h2>Product Detail</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Type: {product.type}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          setShowEditModal(true);
        }}
      >
        Edit
      </button>
    </div>
  );
}

export default ProductDetail;
