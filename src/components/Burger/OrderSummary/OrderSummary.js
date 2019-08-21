import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
  componentWillUpdate() {
    console.log('order summary will update')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        );
      });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total sum: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue checkout?</p>
        <Button buttonType="Danger" clicked={this.props.cancelPurchase}>Cancel</Button>
        <Button buttonType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
      </Aux>
    );
  };
}

export default OrderSummary;
