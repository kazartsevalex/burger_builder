import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isRegister: true
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isRegister);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isRegister: !prevState.isRegister };
    });
  }

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push(
        <Input key={key}
          elementType={this.state.controls[key].elementType}
          elementConfig={this.state.controls[key].elementConfig}
          value={this.state.controls[key].value}
          changed={(e) => this.inputChangedHandler(e, key)}
          invalid={!this.state.controls[key].valid}
          shouldValidate={this.state.controls[key].validation}
          touched={this.state.controls[key].touched}
        />
      );
    }

    const errorCode = this.props.error ? this.props.error.message : null;
    let errorMessage = null;
    switch (errorCode) {
      case null: break;

      case 'EMAIL_EXISTS':
        errorMessage = <p>This email is already taken!</p>;
        break;

      case 'INVALID_EMAIL':
        errorMessage = <p>Incorrect email!</p>;
        break;

      default:
        errorMessage = <p>errorCode</p>;
        break;
    }

    let content = (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button buttonType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          buttonType="Danger"
        >SWITCH TO {this.state.isRegister ? 'LOG IN' : 'REGISTER'}</Button>
      </div>
    );

    if (this.props.loading) {
      content = (
        <div className={classes.Auth}>
          <Spinner />
        </div>
      );
    }

    return content;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister))
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
