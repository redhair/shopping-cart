import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from '.';

const store = createStore(rootReducer, applyMiddleware(thunk));

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
