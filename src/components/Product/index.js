import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Column } from '../Grid';

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string
  }).isRequired
};

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  border-bottom: 1px solid rgb(238, 243, 249);
  padding-bottom: 28px;
  padding-top: 28px;
  align-items: flex-start;

  & p {
    text-align: left !important;
  }
`;

const Name = styled.h4`
  margin: 0;
`;

const Price = styled.p`
  margin: 8px 0;
  font-weight: bold;
`;

const RemoveItemButton = styled.button`
  background-color: transparent;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;
  font-size: 14px;
  max-width: 126px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;

  font-size: 16px;
  width: 28px;
  height: 28px;
`;

const QuantityInput = styled.input`
  margin: 5px 0;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: white;
  border: 1px solid #d2dce0;
  outline: 0;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 700;
  max-width: 100px;
`;

function Product({ product, onRemoveProduct, onQtyChange }) {
  const { product_id, avatar, name, price, quantity, credit_coupon_price } = product;

  return (
    <Wrapper>
      {!!avatar && <img src={avatar.small} width="125" alt={name} />}
      <Column align="flex-start" style={{ marginLeft: '16px' }}>
        <Name>{name}</Name>
        <Price>
          {credit_coupon_price < price ? (
            <>
              <span style={{ textDecoration: 'line-through', color: 'red', fontWeight: '400' }}>${price}</span>
              <span style={{ marginLeft: '8px' }}>${credit_coupon_price}</span>
            </>
          ) : (
            <span>${price}</span>
          )}
        </Price>
        <Column align="flex-start">
          Quantity:&nbsp;
          <QuantityInput
            type="number"
            min="0"
            defaultValue={quantity}
            onChange={e => onQtyChange(product_id, e.target.value)}
          />
        </Column>
      </Column>

      <RemoveItemButton onClick={() => onRemoveProduct(product_id)}>X</RemoveItemButton>
    </Wrapper>
  );
}

export default Product;
