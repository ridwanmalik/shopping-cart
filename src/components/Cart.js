import { FaOpencart } from "react-icons/fa"
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi"
import { BiX, BiTrash } from "react-icons/bi"
import formatCurrency from "../util"

const Cart = ({ show, setShow, cart, removeFormCart }) => {
  const toggleCart = () => {
    setShow(!show)
  }
  return (
    <div>
      { !show ?
        <div className="btn_cart brn btn-primary text-white" onClick={ toggleCart }>
          <FiShoppingCart />
          { cart.length > 0 &&
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              { `${cart.map(item => item.count).reduce((a, b) => a + b, 0)}` }
            </span>
          }
        </div>
        :
        <div className="cart">
          <div className="cart-header d-flex justify-content-between shadow-sm px-3 py-3">
            <div className="cart-header-title d-flex align-items-center">
              <h3 className="mb-0">Cart</h3>
            </div>
            <div className="cart-header-close">
              <button className="btn p-0 fs-3" onClick={ toggleCart }><BiX /></button>
            </div>
          </div>
          <div className="cart-body px-3 py-3">
            { cart.length > 0 ?
              <div className="">
                { cart.map((item, index) => (
                  <div className="cart-body-item mb-6" key={ index }>
                    <div className="d-flex">
                      <div className="cart-body-item-image">
                        <img src={ item.image } alt={ item.title } />
                      </div>
                      <div className="cart-body-item-info ms-3 flex-grow-1 d-flex">
                        <div className="d-flex flex-column justify-content-center flex-grow-1">
                          <div className="cart-body-item-info-title">
                            <h6>{ item.title }</h6>
                          </div>
                          <div className="cart-body-item-info-price">
                            <p className="fw-bold">{ `${formatCurrency(item.price)} x ${item.count}` }</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center ms-5">
                          <button className="btn btn-danger" onClick={ () => removeFormCart(item) }><BiTrash /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) }

              </div>
              : <div className="d-flex flex-column h-50">
                <p className="text-secondary">You have no items in your shopping cart.</p>
                <div className="flex-grow-1 d-flex justify-content-center align-items-center opacity-25">
                  <p className="cart_icon text-center text-secondary"><FaOpencart /></p>
                </div>
              </div>
            }

          </div>
          { cart.length > 0 &&
            <div className="cart-footer d-flex justify-content-between px-3 py-3">
              <div className="cart-footer-total d-flex align-items-center">
                <p className="fs-5 fw-bold mb-0">{ `Total: ${formatCurrency(cart.map(item => item.price * item.count).reduce((a, b) => a + b, 0))}` }</p>
              </div>
              <div className="cart-footer-button">
                <button className="btn btn-primary text-white"><FiShoppingBag className="me-1 fs-5" />Checkout</button>
              </div>
            </div>
          }
        </div>

      }
    </div>
  )
}

export default Cart
