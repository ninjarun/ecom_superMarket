import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { SERVER } from '../../../globalVar';


function Completion(props) {
  const [messageBody, setMessageBody] = useState('');
  // const { stripePromise } = props;
  const [stripePromise, setStripePromise] = useState(null)
  useEffect(() => {
    fetch(`${SERVER}/config`).then(async (r) => {

      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
      console.log(publishableKey)
    });
    
    if (!stripePromise) return;
    
    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);


      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [!stripePromise]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div id="messages" role="alert" style={messageBody ? { display: 'block' } : {}}>{messageBody}</div>
    </>
  );
}

export default Completion;
