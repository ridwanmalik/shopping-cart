import { FaOpencart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Products from "./components/Products";

const App = () => {
  const [products, setProducts] = useState([]);
  // Fetch Users
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProduct();
      setProducts(data);
    };
    getData();
  }, []);

  return (
    <div className='app'>
      <div className='container'>
        <h1 className='my-3'>
          <FaOpencart className='me-3' />
          Shopping Cart
        </h1>
        <Products products={products} />
      </div>
    </div>
  );
};

export default App;
