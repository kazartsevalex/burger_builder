import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'cheapest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const updFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: e.target.value,
      touched: true,
      valid: checkValidity(e.target.value, this.state.orderForm[inputIdentifier].validation)
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updFormElement
    });

    let formIsValid = true;
    for (let id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let fid in this.state.orderForm) {
      formData[fid] = this.state.orderForm[fid].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);
  }

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push(
        <Input key={key}
          elementType={this.state.orderForm[key].elementType}
          elementConfig={this.state.orderForm[key].elementConfig}
          value={this.state.orderForm[key].value}
          changed={(e) => this.inputChangedHandler(e, key)}
          invalid={!this.state.orderForm[key].valid}
          shouldValidate={this.state.orderForm[key].validation}
          touched={this.state.orderForm[key].touched}
        />
      );
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
