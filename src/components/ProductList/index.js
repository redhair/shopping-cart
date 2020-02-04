import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product';

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onRemoveProduct: PropTypes.func.isRequired,
  onQtyChange: PropTypes.func.isRequired
};

function ProductList({ products, onRemoveProduct, onQtyChange }) {
  return (
    <>
      {products.length > 0 &&
        products.map(product => (
          <Product
            key={product.product_id}
            product={product}
            onRemoveProduct={onRemoveProduct}
            onQtyChange={onQtyChange}
          />
        ))}
    </>
  );
}

export default ProductList;
