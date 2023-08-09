import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { SERVER } from '../../globalVar';

const Paypal_btn = (props) => {
    const tmpCart = props.cart.map(function (item){return{price:item.price,product:item.id,quantity:item.amount}})
    const handlePaymentApproval = async (data, actions) => {
        const details = await actions.order.capture();
        const name = details.payer.name.given_name;
        const transactionId = details.id; // Retrieve the transaction ID
        // alert("Transaction completed by " + name + ". Transaction ID: " + transactionId);
        console.log(details)
        // Make backend call to update the database
        try {
            const response = await axios.post(`${SERVER}/orders`, {
                items: tmpCart,
                ...props.UserInfo,
                payment_intent:details.id,
                payment_status:'paid'
                // Include other relevant order information
            });
            console.log(response.data); // Optional: Handle response from backend
        } catch (error) {
            console.error(error);
            // Handle error if the backend call fails
        }
    };
    console.log(props.total)
    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": "Acv35MxVCkOUiuPZvxSGnEhK7-RGjVWQvxtxbhDpALeyCVBoa5o3gnRSYvb9aiYCdZaz9VjPkjQOcGef" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: props.total.toString(),
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={handlePaymentApproval}
                />        </PayPalScriptProvider>

        </div>
    )
}

export default Paypal_btn