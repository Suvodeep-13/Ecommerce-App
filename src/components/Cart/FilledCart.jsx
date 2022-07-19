import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const FilledCart = ({cart, handleUpdateQty, handleRemoveFromCart, handleEmptyCart}) => {
const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
            <Grid item xs = {12} sm={4} key={item.id}>
                <CartItem item = {item} handleUpdateQty={handleUpdateQty} handleRemoveFromCart={handleRemoveFromCart}/>
            </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">
            Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart} >Empty cart</Button>
        <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  )
}

export default FilledCart