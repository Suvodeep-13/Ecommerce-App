import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe('...');

const PaymentForm = ({checkoutToken, backStep}) => {
  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{margin:'20px 0'}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {(elements, stripe) => (
                <form>
                  <CardElement />
                  <br /> <br />
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button variant='contained' color='secondary' onClick={backStep}>Back</Button>
                    <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                      Pay Now {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Button>
                  </div>
                </form>
            )}
          </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm