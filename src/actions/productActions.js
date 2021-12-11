import { FETCH_PRODUCTS } from "../types"

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products")
  const data = await res.json()
  console.log(data)
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  })
}


// const getData = async () => {
//   const res = await fetch(`${process.env.REACT_APP_API_URL}/products`)
//   const data = await res.json()
//   return data
// }


// export const fetchProducts = async () => ({
//   type: FETCH_PRODUCTS,
//   payload: await getData(),
// })
