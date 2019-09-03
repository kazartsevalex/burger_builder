import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updFromElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updFromElement.value = e.target.value;
    updatedOrderForm[inputIdentifier] = updFromElement;
    this.setState({ orderForm: updatedOrderForm });
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let fid in this.state.orderForm) {
      formData[fid] = this.state.orderForm[fid].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/');
      })
      .catch(response => {
        this.setState({ loading: false, purchasing: false });
      });
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
        />
      );
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements}
        <Button buttonType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
