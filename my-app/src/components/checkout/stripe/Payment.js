import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'
import { useSelector } from 'react-redux';
import {selecCart } from '../../navigator/Cart/cartSlice'
import { SERVER } from '../../../globalVar';

function Payment(props) {
    const Cart = useSelector(selecCart)
    const { stripePromise } = props;
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const tmpCart = Cart.cart.map(function (item){return{price:item.price,product:item.id,quantity:item.amount}})
        // const tmpCart = Cart.cart.map(function (item){return{...item,quantity:item.amount}})
        console.log(props.UserInfo)
        // const tmpCart = Cart.cart.map((item)=>({id:item.id, amount:item.amount}))
        // Create PaymentIntent as soon as the page loads
        fetch(`${SERVER}/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: tmpCart, ...props.UserInfo }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

    return (
        <>

            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret, }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default Payment;
