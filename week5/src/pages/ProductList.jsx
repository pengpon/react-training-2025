import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAllProducts } from "../api/products";
import Item from "../components/Item";
import Spinner from "../components/Spinner";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetchAllProducts();
      setProducts(res.data.products);
      setIsLoading(false);
    };
    getAllProducts();
  }, []);
  return (
    <>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="bg-bg-main min-h-screen p-8">
          <h1 className="text-primary text-3xl font-bold mb-6">
            All Products <span>{`(${products?.length})`}</span>
          </h1>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
            {products.map((product) => (
              <Item key={product.id} data={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
