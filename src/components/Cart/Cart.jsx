import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import FilledCart from './FilledCart';
import EmptyCart from './EmptyCart';

const Cart = ({cart, handleUpdateQty, handleRemoveFromCart, handleEmptyCart}) => {
  const classes = useStyles();

  if(!cart.line_items) return "Loading...";
  
  return (
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant='h4' gutterBottom>Your Shopping Cart</Typography>
        {!cart.line_items.length ? <EmptyCart/> : <FilledCart
         cart={cart}
         handleUpdateQty = {handleUpdateQty}
         handleRemoveFromCart = {handleRemoveFromCart} 
         handleEmptyCart = {handleEmptyCart}
        />};
    </Container>
  )
}

export default Cart