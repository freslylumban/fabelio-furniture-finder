import axios from 'axios';
import { PRODUCT_SHOW_ALL, PRODUCT_SHOW_FAILED } from './../types/TypesProducts';

export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://www.mocky.io/v2/5c9105cb330000112b649af8`
    });
    dispatch({
      type: PRODUCT_SHOW_ALL,
      payload: res.data
    });
  }
  catch (error) {
    console.log('ERROR', error)
    dispatch({
      type: PRODUCT_SHOW_FAILED,
      payload: error
    });
  }
}
