import axios from 'axios';

export const getProductMetaData = params => {
  return axios.get('https://prodcat.gopuff.com/api/products', { params });
};
