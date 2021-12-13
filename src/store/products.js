import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from "./api"
import moment from "moment"

const slice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    error: null,
  },
  reducers: {
    productsRequest: (products) => {
      products.loading = true
    },
    productsSuccess: (products, action) => {
      products.list = action.payload
      products.loading = false
      products.lastFetch = Date.now()
    },
    productsFailure: (products, action) => {
      products.loading = false
      products.error = action.payload
    },
  },
})

export const {
  productsRequest,
  productsSuccess,
  productsFailure
} = slice.actions

export default slice.reducer


const url = "/products"


export const loadProducts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.products

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes")
  if (diffInMinutes < 10) return

  return dispatch(
    apiCallBegan({
      url,
      onStart: productsRequest.type,
      onSuccess: productsSuccess.type,
      onError: productsFailure.type
    })
  )
}
