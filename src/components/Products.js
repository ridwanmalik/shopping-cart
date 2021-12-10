import { FiShoppingCart } from "react-icons/fi";
import formatCurrency from "../util";
const Products = ({ products, addToCart }) => {
  return (
    <div className="">
      { products.length > 0 ? (
        <div className='products'>
          { products.map((product, index) => (
            <div className='product' key={ index }>
              <div className='position-relative mb-3'>
                <img src={ product.image } alt={ product.name } className='img-fluid' />
                <div className='overlay'>
                  <button className='btn_add_to_cart btn btn-dark' onClick={ () => addToCart(product) }>
                    <FiShoppingCart />
                    <span className='btn-text'>Add to Cart</span>
                  </button>
                </div>
              </div>
              <div className='d-flex justify-content-between'>
                <h6 className='fw-bold'>{ product.title }</h6>
                <p className='fw-bolder text-secondary'>{ formatCurrency(product.price) }</p>
              </div>
            </div>
          )) }
        </div>
      ) : <p className="text-secondary text-center my-12">No products found</p> }
    </div>
  );
};

Products.defaultProps = {
  products: [],
};

export default Products;
