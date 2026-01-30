import { Link } from "react-router";
function ProductList() {
  const products = [
    {
      id: "123456",
      title: "我是產品1",
    },
    {
      id: "123",
      title: "我是產品2",
    },
  ];
  return (
    <>
      ProductList
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductList;
