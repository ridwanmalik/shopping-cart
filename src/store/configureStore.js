import { configureStore } from '@reduxjs/toolkit'
import reducer from './products'

export default function () {
  return configureStore({
    reducer
  })
}
