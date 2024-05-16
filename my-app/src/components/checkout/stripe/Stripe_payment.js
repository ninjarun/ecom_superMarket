import React, { useEffect, useState } from 'react'
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js';
import './stripe_payment.css';
import { SERVER } from '../../../globalVar';
const Stripe_payment = (props) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    
   console.log(props.UserInfo)
    fetch(`${SERVER}/config`).then(async (r) => {

      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
      // console.log(publishableKey)
    });
  }, []);

  return (
    <div><Payment UserInfo={props.UserInfo} stripePromise={stripePromise} /></div>
  )
}

export default Stripe_payment