import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductList from '../../components/ProductList';
import { Row, Column } from '../../components/Grid';
import Input from '../../components/Input';
import { useDispatch } from 'react-redux';
import { removeItem, updateQty } from '../../actions/cart';

CartContainer.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.array,
    payment_method: PropTypes.string,
    postal_code: PropTypes.string,
    user: PropTypes.shape({
      email: PropTypes.string,
      first_name: PropTypes.string,
      id: PropTypes.number,
      last_name: PropTypes.string
    })
  })
};

const Section = styled.div`
  background: white;
  border-radius: 8px;
  padding: 8px 20px;
  width: 100%;
`;

const SectionHeading = styled(Row)`
  border-bottom: 1px solid rgb(238, 243, 249);
  padding-bottom: 12px;
  width: 100%;
`;

function CartContainer({ cart }) {
  const dispatch = useDispatch();
  const { subtotal, discountedSubtotal } = calculateSubtotals();
  const [needle, setNeedle] = useState('');
  const filteredProducts = cart.products.filter(p => {
    if (!p.name) return false;
    return p.name.toLowerCase().includes(needle.toLowerCase());
  });

  function handleKeyDown(e) {
    setNeedle(e.target.value);
  }

  function calculateSubtotals() {
    let subtotal = 0;
    let discountedSubtotal = 0;
    for (let i = 0; i < cart.products.length; i++) {
      let product = cart.products[i];
      subtotal += product.price * product.quantity;
      discountedSubtotal += product.credit_coupon_price * product.quantity;
    }

    return { subtotal, discountedSubtotal };
  }

  return (
    <Row align="flex-start" style={{ margin: '50px 0px' }}>
      <Section>
        <SectionHeading align="center" justify="space-between">
          <h3>My Items</h3>
          <Input onChange={handleKeyDown} placeholder="Search" style={{ width: '100%;' }} />
        </SectionHeading>

        <Column xs={6} align="flex-start">
          <ProductList
            products={filteredProducts}
            onRemoveProduct={id => {
              dispatch(removeItem(id));
            }}
            onQtyChange={(id, amount) => {
              dispatch(updateQty(id, amount));
            }}
          />
        </Column>
      </Section>
      <Section style={{ marginLeft: '18px' }}>
        <Column xs={6} align="flex-start">
          <SectionHeading>
            <h3>Total</h3>
          </SectionHeading>
          <Row align="center" justify="space-between">
            <h4>Sub-total</h4>
            <div>
              <span style={{ textDecoration: 'line-through', color: 'red' }}>${subtotal.toFixed(2)}</span>
              <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>${discountedSubtotal.toFixed(2)}</span>
            </div>
          </Row>
        </Column>
      </Section>
    </Row>
  );
}

export default CartContainer;
