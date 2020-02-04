import { REMOVE_ITEM, UPDATE_QTY, SET_PRODUCTS } from '../constants';
import { getProductMetaData } from '../api';

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    product_id: id
  };
};

export const updateQty = (id, qty) => {
  return {
    type: UPDATE_QTY,
    product_id: id,
    qty
  };
};

export const loadProducts = params => {
  return function(dispatch) {
    return getProductMetaData(params)
      .then(res => {
        dispatch(setProductMetaData(res.data.products));
      })
      .catch(err => console.error({ err }));
  };
};

export const setProductMetaData = productMetaData => {
  return {
    type: SET_PRODUCTS,
    productMetaData
  };
};
