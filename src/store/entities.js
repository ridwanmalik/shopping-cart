import { combineReducers } from "redux"
import productsReducer from "./products"
// import projectsReducer from "./projects";

export default combineReducers({
  products: productsReducer,
  // projects: projectsReducer,
})
