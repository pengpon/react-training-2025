import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchAllProducts } from "../api/products";
import Item from "../components/Item";

function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(()=> {
    const getAllProducts = async() => {
      const res = await fetchAllProducts()
      console.log(res.data)
      setProducts(res.data.products)
    }
    getAllProducts()
  }, [])
  return (
    <>
      <div className="bg-bg-main min-h-screen p-8">
        <h1 className="text-primary text-3xl font-bold mb-6">Products</h1>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6">
          {
            products.map(product => <Item key={product.id} data={product}/>)
          }
          {/* <div className="p-1 lg:p-4 rounded-main group">
            <a href="#">
              <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-200">
                <figure className="w-full h-full overflow-hidden relative">
                  <img
                    src="https://dummyimage.com/600x400/cdcdcd/fff"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="opacity-0 transition-all duration-700 group-hover:opacity-100 ">
                    <img
                      src="https://dummyimage.com/300x400/eeeeee/fff"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                    />
                    <button className="absolute bottom-10 left-0 right-0 mx-auto px-4 w-fit bg-primary hover:bg-accent text-white py-2 mt-4 rounded-button transition-colors">
                      Quick View
                    </button>
                  </div>
                </figure>
              </div>
            </a>

            <h2 className="text-secondary font-bold">清甜爽脆新鮮蘋果</h2>
            <div>
              <span className="text-primary font-semibold mt-1">$52</span>
              <span className="text-muted font-light line-through italic">$60</span>
            </div>
          </div>
          <div className="p-1 lg:p-4 rounded-main group">
            <a href="#">
              <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-200">
                <figure className="w-full h-full overflow-hidden relative">
                  <img
                    src="https://dummyimage.com/600x400/cdcdcd/fff"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="opacity-0 transition-all duration-700 group-hover:opacity-100 ">
                    <img
                      src="https://dummyimage.com/300x400/eeeeee/fff"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                    />
                    <button className="absolute bottom-10 left-0 right-0 mx-auto px-4 w-fit bg-primary hover:bg-accent text-white py-2 mt-4 rounded-button transition-colors">
                      Quick View
                    </button>
                  </div>
                </figure>
              </div>
            </a>

            <h2 className="text-secondary font-bold">清甜爽脆新鮮蘋果</h2>
            <div>
              <span className="text-primary font-semibold mt-1">$52</span>
              <span className="text-muted font-light line-through italic">$60</span>
            </div>
          </div>
          <div className="p-1 lg:p-4 rounded-main group">
            <a href="#">
              <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-200">
                <figure className="w-full h-full overflow-hidden relative">
                  <img
                    src="https://dummyimage.com/600x400/cdcdcd/fff"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="opacity-0 transition-all duration-700 group-hover:opacity-100 ">
                    <img
                      src="https://dummyimage.com/300x400/eeeeee/fff"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                    />
                    <button className="absolute bottom-10 left-0 right-0 mx-auto px-4 w-fit bg-primary hover:bg-accent text-white py-2 mt-4 rounded-button transition-colors">
                      Quick View
                    </button>
                  </div>
                </figure>
              </div>
            </a>

            <h2 className="text-secondary font-bold">清甜爽脆新鮮蘋果</h2>
            <div>
              <span className="text-primary font-semibold mt-1">$52</span>
              <span className="text-muted font-light line-through italic">$60</span>
            </div>
          </div>
          <div className="p-1 lg:p-4 rounded-main group">
            <a href="#">
              <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-200">
                <figure className="w-full h-full overflow-hidden relative">
                  <img
                    src="https://dummyimage.com/600x400/cdcdcd/fff"
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="opacity-0 transition-all duration-700 group-hover:opacity-100 ">
                    <img
                      src="https://dummyimage.com/300x400/eeeeee/fff"
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                    />
                    <button className="absolute bottom-10 left-0 right-0 mx-auto px-4 w-fit bg-primary hover:bg-accent text-white py-2 mt-4 rounded-button transition-colors">
                      Quick View
                    </button>
                  </div>
                </figure>
              </div>
            </a>

            <h2 className="text-secondary font-bold">清甜爽脆新鮮蘋果</h2>
            <div>
              <span className="text-primary font-semibold mt-1">$52</span>
              <span className="text-muted font-light line-through italic">$60</span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ProductList;
