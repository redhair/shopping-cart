import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartContainer from '../CartContainer';
import { Container } from '../../components/Grid';
import { loadProducts } from '../../actions/cart';

let _init = false;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const product_ids = cart.products.map(p => p.product_id).join();

  useEffect(() => {
    if (_init) return;

    dispatch(loadProducts({ location_id: -1, product_ids }));

    _init = true;
  }, [dispatch, product_ids]);

  return (
    <Container>
      <h1>View Cart</h1>
      <CartContainer cart={cart} />
    </Container>
  );
}

export default App;
