import { createAction, createReducer } from '@reduxjs/toolkit'

export const fetchProducts = createAction('fetchProducts')

// Reducer
export default createReducer([], {
  [fetchProducts.type]: async (products, action) => {
    const productsFromServer = await fetchProductsFromServer()
    products = productsFromServer
  }
})
// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case fetchProducts.type:
//       return action.payload
//     default:
//       return state
//   }
// }

// fetch products
const fetchProductsFromServer = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/products`)
  const data = await res.json()
  return data
}
