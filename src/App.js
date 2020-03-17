import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/product/:name" component={ProductDetail} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App;
