

from django.core.mail import send_mail
import os
from django.shortcuts import render
from django.http import BadHeaderError, FileResponse, HttpResponse, HttpResponseForbidden, JsonResponse
from .models import Product, Order, OrderItem
from .Serializer import ProductSerializer, OrderSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.contrib.auth.models import User

import stripe
import json

from django.conf import settings

from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from rest_framework.request import Request
from django.http import HttpRequest

stripe.api_key = settings.STRIPE_SECRET_KEY

import xml.etree.ElementTree as ET


###################################################################################################################
# PROFILE VIEW
#################################################################################################################
# login

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        token['junk'] = "bling bling"
        # ...
        return token

    # register


@api_view(['POST'])
def register(req):
    username = req.data["username"]
    password = req.data["password"]
    # create a new user (encrypt password)
    try:
        User.objects.create_user(username=username, password=password)
    except:
        return Response("error")
    return Response(f"{username} registered")


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

##################################################################################################################
# EMAIL TESTING
##################################################################################################################

class MailMail(APIView):
    def post(self, request, *args, **kwargs):
        try:
            send_mail(
                'Test Subject',
                'Test message body.',
                'pizohim62@gmail.com',
                ['orenyoni87@gmail.com'],
                fail_silently=False,
            )
            return HttpResponse('Email successfully sent!')
        except BadHeaderError:
            return HttpResponse('Invalid header found!')

        except Exception as e:
            return HttpResponse(f"An error occurred: {e}")


##################################################################################################################
# DOWNLOAD COMPLETE SITE MAP FOR SEO PURPOSES  
##################################################################################################################
class SitemapGeneratorView(APIView):
    def get(self, request, *args, **kwargs):
        FrontEndDomain = 'https://silver-cocada-e03718.netlify.app/'
        
        # Get all products from the database
        products = Product.objects.all()

        additional_urls = [
            {"url": f'{FrontEndDomain}', "lastmod": "2023-01-01", "changefreq": "daily", "priority": "1.0"},
            {"url": f'{FrontEndDomain}aboutus', "lastmod": "2023-01-01", "changefreq": "daily", "priority": "0.5"},
            {"url": f'{FrontEndDomain}contactus', "lastmod": "2023-01-02", "changefreq": "monthly", "priority": "0.5"},
            {"url": f'{FrontEndDomain}checkout', "lastmod": "2023-01-02", "changefreq": "monthly", "priority": "0.5"},
            # Add more URLs here
        ]

        # Serialize the products
        api_serializer = ProductSerializer(products, many=True)
        serialized_products = api_serializer.data

        # Create the root element for the sitemap
        urlset = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

        # Adding additional URLs
        for additional_url in additional_urls:
            url = ET.SubElement(urlset, "url")
            loc = ET.SubElement(url, "loc")
            loc.text = additional_url['url']  # Using the full URL
            
            lastmod = ET.SubElement(url, "lastmod")
            lastmod.text = additional_url['lastmod']  # Dynamic value
            
            changefreq = ET.SubElement(url, "changefreq")
            changefreq.text = additional_url['changefreq']  # Dynamic value
            
            priority = ET.SubElement(url, "priority")
            priority.text = additional_url['priority']  # Dynamic value

        # Loop through each serialized product to populate the sitemap
        for product in serialized_products:
            url = ET.SubElement(urlset, "url")
            full_url = f'{FrontEndDomain}product/{product["id"]}'  # Composing the URL
            
            loc = ET.SubElement(url, "loc")
            loc.text = full_url  # Using the full URL
            
            lastmod = ET.SubElement(url, "lastmod")
            lastmod.text = product.get("lastmod", "2023-01-01")  # Placeholder
            
            changefreq = ET.SubElement(url, "changefreq")
            changefreq.text = product.get("changefreq", "monthly")  # Default value
            
            priority = ET.SubElement(url, "priority")
            priority.text = product.get("priority", "0.8")  # Default value

        # Create the ElementTree and write to file
        tree = ET.ElementTree(urlset)
        # static_path = os.path.join(settings.STATIC_ROOT, 'sitemap.xml')
        # with open(sitemap_path, "wb") as fh:
        with open("static/sitemap.xml", "wb") as fh:
            tree.write(fh)

        return Response({"message": "Sitemap generated successfully"}, status=status.HTTP_200_OK)


##################################################################################################################
# DOWNLOAD DATABASE BACKUP
##################################################################################################################
class Backup_database(APIView):
    def get(self, request, *args, **kwargs):
        # Make sure to add security checks, like admin-only access
        path_to_db = "./db.sqlite3"
        response = FileResponse(open(path_to_db, 'rb'))
        response['Content-Disposition'] = 'attachment; filename="db_backup.sqlite3"'
        return response


##################################################################################################################
# PRODUCTS VIEW
##################################################################################################################
class Products(APIView):
    parser_class = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        api_serializer = ProductSerializer(data=request.data)

        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', api_serializer.errors)
            return Response(api_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        product_id = request.query_params.get('id', None)

        if product_id:
            product = get_object_or_404(Product, pk=product_id)
            api_serializer = ProductSerializer(product)
            return Response(api_serializer.data)
        else:
            products = Product.objects.all()
            api_serializer = ProductSerializer(products, many=True)
            return Response(api_serializer.data)

    def put(self, request, *args, **kwargs):
        print(request.data)
        product_id = request.data['id']
        product = get_object_or_404(Product, pk=product_id)
        api_serializer = ProductSerializer(
            product, data=request.data, partial=True)

        if api_serializer.is_valid():
            api_serializer.save()
            return Response(api_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(api_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        product_id = request.data['id']
        product = get_object_or_404(Product, pk=product_id)
        product.delete()
        # product.is_available = False  # Set the availability status to False
        return Response(status=status.HTTP_204_NO_CONTENT)
    

###################################################################################################################
# ORDERS VIEW
##################################################################################################################


class OrderAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        # print(request.data)
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        order_id = request.query_params.get('order_id')
        email = request.query_params.get('email')
        all = request.query_params.get('all')
        print(order_id)
        if order_id:
            try:
                order = Order.objects.get(id=order_id)
                serializer = OrderSerializer(order)
                return Response(serializer.data)
            except Order.DoesNotExist:
                return Response(
                    {'error': 'Order does not exist.'},
                    status=status.HTTP_404_NOT_FOUND
                )

        if email:
            orders = Order.objects.filter(email=email)
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)

        if all:
            orders = Order.objects.all()
            serializer = OrderSerializer(orders, many=True)
            serialized_data = serializer.data

            # Retrieve and include product data for each order item
            for order_data in serialized_data:
                order_items_data = order_data['items']
                for item_data in order_items_data:
                    product_id = item_data['product']
                    product = get_object_or_404(Product, id=product_id)
                    item_data['product'] = ProductSerializer(product).data

            return Response(serialized_data)

        return Response(
            {'error': 'Please provide an order ID or email.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    def put(self, request):
        order_id = request.data.get('order_id')
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order does not exist.'},
                status=status.HTTP_404_NOT_FOUND
            )

        tracking_number = request.data.get('tracking_number')
        if not tracking_number:
            return Response(
                {'error': 'Please provide a tracking number.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        order.tracking_number = tracking_number
        order.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data)


##################################################################################################################
# STRIPE VIEW
##################################################################################################################


@api_view(['GET'])
def get_config(req):
    return JsonResponse({'publishableKey': settings.STRIPE_PUBLIC_KEY})


@api_view(['POST'])
def create_payment(req):
    total = 0
    for i in req.data['items']:
        price = float(i['price'])
        quantity = int(i['quantity'])
        total += price*quantity
    total = int(total*100)
    intent = stripe.PaymentIntent.create(
        # payment_method_types=['card'],
        amount=total,
        currency='usd',
        automatic_payment_methods={
            'enabled': False,
        },
        metadata={'cart': json.dumps(
            req.data['items']), 'comments': req.data['comments']},
        receipt_email=req.data['email'],
        # shipping={'name':req.data['full_name']}
        shipping={
            'name': req.data['full_name'],
            'phone': req.data['telephone_number'],
            'address': {
                'postal_code': req.data['zipcode'],
                'city': req.data['city'],
                'line1': req.data['street'],
                'line2': req.data['apartment'],
                'country': 'israel'
            }
        }

    )

    return JsonResponse({'clientSecret': intent['client_secret']})


@csrf_exempt
def my_webhook_view(request):
    payload = request.body
    event = None

    try:
        event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)

    # Handle the event
    if event.type == 'payment_intent.created':
        payment_intent = event.data.object  # contains a stripe.PaymentIntent
        tmpCart = json.loads(payment_intent.metadata.cart)
        data = {"items": tmpCart,
                "full_name": payment_intent.shipping.name,
                "telephone_number": payment_intent.shipping.phone,
                "email": payment_intent.receipt_email,
                "zipcode": payment_intent.shipping.address.postal_code,
                "city": payment_intent.shipping.address.city,
                "street": payment_intent.shipping.address.line1,
                "apartment": payment_intent.shipping.address.line2,
                "payment_status": "intent",
                "payment_intent": payment_intent.id,
                "comments": payment_intent.metadata.comments,
                "payment_intent": payment_intent.id
                }
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        else:
            return HttpResponse(serializer.errors, status=400)

        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
    elif event.type == 'payment_method.attached':
        payment_method = event.data.object  # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    # ... handle other event types
    elif event.type == 'charge.succeeded':
        payment_intent_id = event.data.object.payment_intent

        try:
            order = Order.objects.get(payment_intent=payment_intent_id)
            order.payment_status = "paid"
            serializer = OrderSerializer(
                instance=order, data={"payment_status": "paid"}, partial=True)
            if serializer.is_valid():
                serializer.save()
            else:
                return HttpResponse(serializer.errors, status=400)
        except Order.DoesNotExist:
            print("Order not found for payment_intent: {}".format(payment_intent_id))

    else:
        print('Unhandled event type {}'.format(event.type))

    return HttpResponse(status=200)
