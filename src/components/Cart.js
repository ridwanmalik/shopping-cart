import { FiShoppingCart } from "react-icons/fi";
import { BiX, BiTrash } from "react-icons/bi";
import formatCurrency from "../util";

const Cart = ({ show, setShow, cart, setCart }) => {
  const toggleCart = () => {
    setShow(!show);
  };

  const removeFormCart = (item) => {
    setCart(cart.filter(cartItem => cartItem.id !== item.id));
  }
  return (
    <div>
      { show ?
        <div className="btn_cart brn btn-dark" onClick={ toggleCart }><FiShoppingCart /></div>
        :
        <div className="cart">
          <div className="cart-header d-flex justify-content-between px-3 py-3">
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
                  <div className="cart-body-item mb-3" key={ index }>
                    <div className="d-flex">
                      <div className="cart-body-item-image">
                        <img src={ item.image } alt={ item.title } />
                      </div>
                      <div className="cart-body-item-info ms-3 flex-grow-1 d-flex">
                        <div className="d-flex flex-column justify-content-center flex-grow-1">
                          <div className="cart-body-item-info-title">
                            <h5>{ item.title }</h5>
                          </div>
                          <div className="cart-body-item-info-price">
                            <p className="fw-bold">{ formatCurrency(item.price) } x { item.count }</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-danger" onClick={ () => removeFormCart(item) }><BiTrash /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) }

              </div>
              : <p className="text-secondary">Cart is empty</p>
            }

          </div>
          <div className="cart-footer d-flex justify-content-between px-3 py-3">
            <div className="cart-footer-total">
              <h5 className="mb-0">Total: { formatCurrency(cart.map(item => item.price).reduce((a, b) => a + b, 0)) }</h5>
            </div>
            <div className="cart-footer-button">
              <button className="btn btn-dark">Checkout</button>
            </div>
          </div>
        </div>

      }
    </div>
  )
}

export default Cart
