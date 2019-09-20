import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

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

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });

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

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return content;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
