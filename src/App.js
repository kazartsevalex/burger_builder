import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
        </Layout>
      </div>
    );
  }
}

export default App;
