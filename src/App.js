import { FaOpencart } from "react-icons/fa"
import { useEffect, useState } from "react"
import Products from "./components/Products"
import Cart from "./components/Cart"
import configureStore from './store/configureStore'
import { loadProducts } from "./store/products"


const store = configureStore()
const App = () => {
  console.log("store", store.getState())
  const [products, setProducts] = useState([])
  const localCart = JSON.parse(localStorage.getItem("userCart"))
  const [cart, setCart] = useState(localCart ? localCart : [])
  const [show, setShow] = useState(false)
  // Fetch Users
  const fetchProduct = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products`)
      const data = await res.json()
      return data
    } catch (error) {
      console.log(error.message)
      return null
    }
  }

  const addToCart = (product) => {
    const find = cart.find((item) => item.id === product.id)
    if (find) {
      const index = cart.findIndex((item) => item.id === product.id)
      const newCart = [...cart.slice(0, index), { ...find, count: ++find.count }, ...cart.slice(index + 1)]
      setCart(newCart)
      localStorage.setItem("userCart", JSON.stringify(newCart))
    } else {
      const newCart = [...cart, { ...product, count: 1 }]
      setCart(newCart)
      localStorage.setItem("userCart", JSON.stringify(newCart))
    }
  }

  const removeFormCart = (item) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== item.id)
    setCart(newCart)
    localStorage.setItem("userCart", JSON.stringify(newCart))
  }

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProduct()
      setProducts(data)
    }
    store.dispatch(loadProducts())
    // getData()
    // store.dispatch(fetchProducts())
  }, [])

  return (
    <div className='app'>
      <div className='container'>
        <h1 className='mt-4 mb-12'>
          <span className="text-primary">
            <FaOpencart className='me-3' />
          </span>
          Shopping Cart
        </h1>
        <Products products={ products } addToCart={ addToCart } />
        <Cart show={ show } cart={ cart } setShow={ setShow } removeFormCart={ removeFormCart } />
      </div>
    </div>
  )
}

export default App
