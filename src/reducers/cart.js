import { REMOVE_ITEM, UPDATE_QTY, SET_PRODUCTS } from '../constants';

const initialState = {
  products: [
    {
      quantity: 4,
      available_for_bonus: false,
      category_id: 20,
      credit_coupon_price: 0.98,
      discount: 2.04,
      id: 989,
      price: 1.49,
      product_id: 989
    },
    {
      quantity: 1,
      category_id: 59,
      credit_coupon_price: 4.95,
      discount: 0,
      id: 1068,
      price: 4.95,
      product_id: 1068
    },
    {
      quantity: 1,
      category_id: 59,
      credit_coupon_price: 4.99,
      discount: 0,
      id: 2830,
      price: 4.99,
      product_id: 2830
    },
    {
      quantity: 1,
      category_id: 20,
      credit_coupon_price: 4.47,
      discount: 0.52,
      id: 1760,
      price: 4.99,
      product_id: 1760
    },
    {
      quantity: 1,
      category_id: 20,
      credit_coupon_price: 3.29,
      discount: 0,
      id: 13644,
      price: 3.29,
      product_id: 13644
    },
    {
      quantity: 1,
      category_id: 38,
      credit_coupon_price: 5.69,
      discount: 0,
      id: 929,
      price: 5.69,
      product_id: 929
    },
    {
      quantity: 1,
      category_id: 11,
      credit_coupon_price: 3.99,
      discount: 0,
      id: 7294,
      price: 3.99,
      product_id: 7294
    },
    {
      quantity: 1,
      category_id: 11,
      credit_coupon_price: 7.79,
      discount: 0,
      id: 4957,
      price: 7.79,
      product_id: 4957
    },
    {
      quantity: 2,
      category_id: 20,
      credit_coupon_price: 3.27,
      discount: 1.04,
      id: 8756,
      price: 3.79,
      product_id: 8756
    },
    {
      quantity: 1,
      category_id: 13,
      credit_coupon_price: 2.29,
      discount: 0,
      id: 356,
      price: 2.29,
      product_id: 356
    },
    {
      quantity: 2,
      category_id: 20,
      credit_coupon_price: 1.78,
      discount: 1.02,
      id: 879,
      price: 2.29,
      product_id: 879
    }
  ],
  payment_method: 'cash',
  postal_code: '19103',
  user: {
    email: 'joel.embiid@gopuff.com',
    first_name: 'Joel',
    id: 123456,
    last_name: 'Embiid'
  }
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      let products = [];
      for (let i = 0; i < state.products.length; i++) {
        products.push({
          ...action.productMetaData.find(itmInner => itmInner.product_id === state.products[i].product_id),
          ...state.products[i]
        });
      }

      return {
        ...state,
        products: products
      };
    case REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(p => p.product_id !== action.product_id)
      };
    case UPDATE_QTY:
      const idx = state.products.findIndex(p => p.product_id === action.product_id);
      const updatedProduct = { ...state.products[idx], quantity: action.qty };
      const updatedProducts = [...state.products.slice(0, idx), updatedProduct, ...state.products.slice(idx + 1)];

      return {
        ...state,
        products: updatedProducts
      };
    default:
      return initialState;
  }
};

export default cart;
