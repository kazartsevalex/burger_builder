import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (let ingName in props.ingredients) {
    ingredients.push(<span key={ingName} style={{ display: 'inline-block', margin: '0 8px' }}>
      {ingName}: {props.ingredients[ingName]}
    </span>);
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
