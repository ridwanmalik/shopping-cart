import { FiShoppingCart } from "react-icons/fi"
import { BiStar } from "react-icons/bi"
import formatCurrency from "../util"
import Modal from 'react-modal'
import { useState } from "react"
import { connect } from "react-redux"

const Products = ({ products, addToCart }) => {
  const [product, setProduct] = useState(null)

  const openModal = (product) => {
    setProduct(product)
  }

  const closeModal = () => {
    setProduct(null)
  }

  const addTOCartModal = () => {
    addToCart(product)
    closeModal()
  }

  const addTOCartButton = (product) => {
    addToCart(product)
    closeModal()
  }

  return (
    <div className="">
      { products.length > 0 ? (
        <div className='products'>
          { products.map((product, index) => (
            <div className='product' key={ index }>
              <div className='position-relative mb-3'>
                <img src={ product.image } alt={ product.name } className='img-fluid' onClick={ () => openModal(product) } />
                <div className='overlay'>
                  <button className='btn_add_to_cart btn btn-primary text-white' onClick={ () => addTOCartButton(product) }>
                    <FiShoppingCart />
                    <span className='btn-text'>Add to Cart</span>
                  </button>
                </div>
              </div>
              <div className='d-flex justify-content-between' onClick={ () => openModal(product) }>
                <h6 className='fw-bold'>{ product.title }</h6>
                <p className='fw-bolder text-secondary ms-5'>{ formatCurrency(product.price) }</p>
              </div>
            </div>
          )) }
        </div>
      ) : <p className="text-secondary text-center my-12">No products found</p> }
      { product && (
        <Modal isOpen={ true } onRequestClose={ closeModal }>
          <button className="close-modal btn btn-dark" onClick={ closeModal }>x</button>
          <div className="product-details d-flex py-8">
            <div className="product-details-image">
              <img className="modal-img" src={ product.image } alt={ product.title } />
            </div>
            <div className="product-details-description ps-8">
              <h2 className="mb-5">{ product.title }</h2>
              <p className="fw-bold d-flex">$<span className="fs-3 lh-1">{ product.price }</span></p>
              <p>{ product.description }</p>
              <div className="">
                <button className="btn btn-primary text-white rounded-pill py-2 px-5 mb-5" onClick={ addTOCartModal }><FiShoppingCart className="fs-5 me-2" />Add To Cart</button>
              </div>
              <div className="rating d-flex">
                <span className="text-primary me-1">
                  <BiStar className="fs-5" />
                </span>
                <p className="rating_rate fs-5 fw-bold mb-0">{ `${product.rating.rate} | ${product.rating.count} ratings` }</p>
              </div>
            </div>
          </div>
        </Modal>
      ) }
    </div>
  )
}

Products.defaultProps = {
  products: [],
}

export default connect((state) => ({ products: state.entities.products.list }), {})(Products)
