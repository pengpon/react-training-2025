import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../api/front/products";
import Spinner from "../../components/Spinner";
import ErrorState from "../../components/ErrorState";
import Item from "../../components/Item";
import { logger } from "../../utils/logger";
import Toast from "../../utils/swal";

function ProductList() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await fetchAllProducts();
        setProducts(res.data.products);
      } catch (error) {
        Toast.fire({
          position: "top",
          icon: "warning",
          title: `Something Wrong...`,
          color: "#fff",
          iconColor: "#fff",
          background: "#ff8f40",
        });
        logger.error(error.message, error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllProducts();
  }, []);
  return (
    <>
      {!products && (isLoading ? <Spinner /> : <ErrorState />)}
      {!isLoading &&
        products && (
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
