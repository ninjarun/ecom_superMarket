from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(null=True, blank=True, default='placeholder.png')
    image2 = models.ImageField(null=True, blank=True, default='placeholder.png')
    image3= models.ImageField(null=True, blank=True, default='placeholder.png')
    image4 = models.ImageField(null=True, blank=True, default='placeholder.png')
    image5 = models.ImageField(null=True, blank=True, default='placeholder.png')
    category = models.CharField(max_length=50, default='Default')

    def __str__(self):
        return self.name


class Order(models.Model):
    full_name = models.CharField(max_length=255, default='John Doe')
    telephone_number = models.CharField(max_length=20, default='N/A')
    email = models.EmailField(default='example@example.com')
    city = models.CharField(max_length=255, default='Default City')
    street = models.CharField(max_length=255, default='Default Street')
    apartment = models.CharField(max_length=50, default='N/A')
    zipcode = models.CharField(max_length=7, default='00000')
    comments = models.TextField(null=True, blank=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(max_length=50, default='Default')
    payment_intent = models.CharField(max_length=50, default='Default')
    tracking_number = models.CharField(max_length=50, default='Default')

    def __str__(self):
        return f"Order {self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.SET_NULL, related_name='items', null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, default="default")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    quantity = models.PositiveIntegerField(default=1)

    # def __str__(self):
    #     return f"{self.quantity} x {self.product.name} in {self.order}"

    # def get_total_price(self):
    #     return self.product.price * self.quantity
