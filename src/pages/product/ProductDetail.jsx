import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../service/api";

function ProductDetail() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery(["product", id], () => {
    return api.get(`/product/${id}`).then((res) => res.data);
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
      <h2>Product Detail</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.name}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Type: {product.type}</p>
    </div>
  );
}

export default ProductDetail;
