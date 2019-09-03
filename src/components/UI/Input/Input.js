import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputEl = null;

  switch (props.inputtype) {
    case 'input':
      inputEl = <input className={classes.InputElement} {...props} />;
      break;

    case 'textarea':
      inputEl = <textarea className={classes.InputElement} {...props} />;
      break;

    default:
      inputEl = <input className={classes.InputElement} {...props} />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
}

export default input;
