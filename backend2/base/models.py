from collections import Counter
import os
from django.db import models
from PIL import Image

from rembg import remove
from io import BytesIO
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
    available = models.BooleanField(default=True, blank=True)
    
    def __str__(self):
        return self.name
    ##    img.save(image_field.path, "PNG")
        
    # def remove_background(self, image_field):
    #     # Fast checks to prevent unnecessary work
    #     if not image_field or not getattr(image_field, 'path', None) or not os.path.exists(image_field.path):
    #         return

    #     # Use rembg to remove background without loading entire image into Pillow unless necessary
    #     try:
    #         with open(image_field.path, 'rb') as f:
    #             input_image = f.read()

    #         output_image = remove(input_image)  # Already returns a PNG with transparency

    #         new_path = os.path.splitext(image_field.path)[0] + ".png"

    #         # Save directly without reprocessing in Pillow if no change is needed
    #         with open(new_path, 'wb') as out_f:
    #             out_f.write(output_image)

    #         # Update image field's relative path
    #         relative_path = image_field.name.rsplit('.', 1)[0] + '.png'
    #         image_field.name = relative_path
    #         image_field.file.name = relative_path
    #     except Exception as e:
    #         print(f"Error processing image {image_field.name}: {e}")

    def save(self, *args, **kwargs):
        # Save once to ensure paths exist
        super().save(*args, **kwargs)

        # Collect images in a loop to reduce repetition
        image_fields = ['image', 'image2', 'image3', 'image4', 'image5']
        updated = False

        for field in image_fields:
            image_field = getattr(self, field, None)
            if image_field:
                # self.remove_background(image_field)
                updated = True

        # Save once again only if paths were updated
        if updated:
            super().save(update_fields=image_fields)



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
