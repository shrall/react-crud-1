import { RiDeleteBin2Fill } from "react-icons/ri";
import { RiEditBoxLine } from "react-icons/ri";

function ProductCard({product, openEditForm, deleteProduct}) {
  return (
    <div className="group relative">
      <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 lg:h-72 xl:h-80 relative group">
        <img
          src={
            product.image &&
            `data:${product.image.contentType};base64,${product.image.data}`
          }
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
        <p className="text-sm font-medium text-indigo-400">$ {product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
