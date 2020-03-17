import { PRODUCT_SHOW_ALL } from '../types/TypesProducts';

const initialState = {
  allProducts: [],
  allFurnitureStyles: [],
  detailProduct: {},
  error: null
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
    default:
      return state;
  }
}
