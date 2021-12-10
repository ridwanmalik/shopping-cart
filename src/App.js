import { FaOpencart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(false);
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

  const addToCart = (product) => {
    const newCart = [...cart, { ...product, count: 1 }];
    setCart(newCart);
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
        <Products products={ products } addToCart={ addToCart } />
        <Cart show={ show } cart={ cart } setShow={ setShow } setCart={ setCart } />
      </div>
    </div>
  );
};

export default App;
