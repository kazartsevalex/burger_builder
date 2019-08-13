import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Aux>
        <Burger/ >
      </Aux>
    );
  }
}

export default BurgerBuilder;
