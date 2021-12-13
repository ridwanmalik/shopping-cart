import { FaOpencart } from "react-icons/fa"
import { useEffect, useState } from "react"
import Products from "./components/Products"
import Cart from "./components/Cart"
import configureStore from './store/configureStore'
import { loadProducts } from "./store/products"
import { Provider } from "react-redux"

const store = configureStore()
const App = () => {
  console.log("store", store.getState())
  const [products, setProducts] = useState([])
  const localCart = JSON.parse(localStorage.getItem("userCart"))
  const [cart, setCart] = useState(localCart ? localCart : [])
  const [show, setShow] = useState(false)

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
    store.dispatch(loadProducts())
  }, [])

  return (
    <Provider store={ store }>
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
    </Provider>
  )
}

export default App
