from collections import Counter
import os
from django.db import models
from PIL import Image


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
    
    @staticmethod
    def detect_background_color(img):
        width, height = img.size
        border_pixels = [
            img.getpixel((0, 0)),
            img.getpixel((0, height-1)),
            img.getpixel((width-1, 0)),
            img.getpixel((width-1, height-1)),
            img.getpixel((width//2, 0)),
            img.getpixel((0, height//2)),
            img.getpixel((width-1, height//2)),
            img.getpixel((width//2, height-1))
        ]
        color_counts = Counter(border_pixels)
        return color_counts.most_common(1)[0][0]

    def remove_background(self, image_field, tolerance=50):
        if not image_field or not image_field.path or not os.path.exists(image_field.path):
            return

        img = Image.open(image_field.path)
        img = img.convert("RGBA")
        bg_color = self.detect_background_color(img)
        datas = img.getdata()
        newData = []

        for item in datas:
            if all([abs(item[i] - bg_color[i]) < tolerance for i in range(3)]):
                newData.append((255, 255, 255, 0))  # Make it transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(image_field.path, "PNG")

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Process each image
        if self.image:
            self.remove_background(self.image)
        if self.image2:
            self.remove_background(self.image2)
        if self.image3:
            self.remove_background(self.image3)
        if self.image4:
            self.remove_background(self.image4)
        if self.image5:
            self.remove_background(self.image5)


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

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in {self.order}"

    # def get_total_price(self):
    #     return self.product.price * self.quantity
