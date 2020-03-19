import { PRODUCT_SHOW_ALL, PRODUCT_SHOW_FAILED } from '../types/TypesProducts';

const initialState = {
  allProducts: [],
  allFurnitureStyles: [],
  detailProduct: {},
  errorMsg: [],
  errorBool: false
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_SHOW_ALL:
      return {
        ...state,
        ...payload,
        allProducts: payload.products,
        allFurnitureStyles: payload.furniture_styles
      }
    case PRODUCT_SHOW_FAILED:
      return {
        ...state,
        ...payload,
        errorMsg: payload,
        errorBool: true
      }
    default:
      return state;
  }
}
