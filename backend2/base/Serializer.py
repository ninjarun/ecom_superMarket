from rest_framework import serializers
from .models import Product, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    # name = serializers.ReadOnlyField(source='product.name')
    # price = serializers.ReadOnlyField(source='product.price')

    class Meta:
        model = OrderItem
        # fields = ('product', 'quantity')
        fields = ('quantity', 'name', 'price','product')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('id',
                  'full_name',
                  'telephone_number',
                  'email',
                  'city',
                  'street',
                  'apartment',
                  'zipcode',
                  'comments',
                  'date_ordered',
                  'items',
                  'payment_status',
                  'payment_intent',
                  'tracking_number')

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:

            # product_id = item_data['product']
            # print(item_data)
            # product = Product.objects.get(id=product_id)
            quantity = item_data['quantity']
            product=item_data['product']
            
            # print(product.name)

            # product=item_data['product']
            # product1 = ProductSerializer(product, many=False)
            # product={product_tmp.id,product_tmp.name,product.price,product_tmp.img}
            # OrderItem.objects.create(order=order, product=product_id, quantity=quantity)#,name=product.name,price=product.price)
            OrderItem.objects.create(
                order=order, name=product.name, price=product.price, quantity=quantity,product=product)
        return order
