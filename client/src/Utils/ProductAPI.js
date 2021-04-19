import axios from 'axios';

const ProductAPI = {
  getProduct: (pid) => {
    return axios.get(`/product?pid=${pid}`)
    .then((results) => {
      return results.data;
    })
    .catch((err) => {
      return err;
    })
  },

  getRelatedProducts: (productIDs) => {
    return axios.post(`/product`, {
      pids: productIDs
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    })
  },

  postCart: (sku) => {
    return axios.post('/cart', {sku: sku});
  },
}


export default ProductAPI;