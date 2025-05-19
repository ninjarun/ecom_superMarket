from django.core.mail import send_mail
import json
import stripe

@csrf_exempt
def my_webhook_view(request):
    payload = request.body
    event = None

    try:
        event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )
    except ValueError as e:
        return HttpResponse(status=400)  # Invalid payload

    if event.type == 'charge.succeeded':
        charge = event.data.object
        payment_intent_id = charge.payment_intent

        try:
            order = Order.objects.get(payment_intent=payment_intent_id)
            order.payment_status = "paid"
            serializer = OrderSerializer(instance=order, data={"payment_status": "paid"}, partial=True)
            if serializer.is_valid():
                serializer.save()

                # Formatting item details for the admin email
                items_details = '\n'.join([
                    f"{item['quantity']}x {item['name']} at ${item['price']}"
                    for item in serializer.data['items']
                ])

                # Email to the customer
                send_mail(
                    'Thank you for your purchase!',
                    f'Hello {order.full_name}, we have received your order.',
                    'your-gmail-address@gmail.com',
                    [order.email],
                    fail_silently=False,
                )

                # Email to the admin
                admin_email_body = f"""
                New sale completed:
                Customer: {order.full_name}
                Email: {order.email}
                Items Purchased: 
                {items_details}
                Total: ${order.get_total()}  # Assuming get_total method calculates total
                """
                send_mail(
                    'New Sale Alert!',
                    admin_email_body,
                    'your-gmail-address@gmail.com',
                    ['admin@example.com'],
                    fail_silently=False,
                )
            else:
                return HttpResponse(serializer.errors, status=400)

        except Order.DoesNotExist:
            return HttpResponse(f"Order not found for payment_intent: {payment_intent_id}", status=404)

    else:
        return HttpResponse(f'Unhandled event type {event.type}', status=200)

    return HttpResponse(status=200)
