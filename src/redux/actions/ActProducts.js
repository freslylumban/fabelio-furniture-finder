import axios from 'axios';
import { PRODUCT_SHOW_ALL } from './../types/TypesProducts';

export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://www.mocky.io/v2/5c9105cb330000112b649af8`
    });
    dispatch({
      type: PRODUCT_SHOW_ALL,
      payload: res.data
    });
  }
  catch (error) {
    
  }
}
