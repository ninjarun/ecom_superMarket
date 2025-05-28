from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/',views.register ),
    path('products',views.Products.as_view()),
    # path('products/<int:pk>/', views.Products.as_view()),

    path('orders',views.OrderAPIView.as_view()),
    path('config', views.get_config, ),#STRIPE
    path('create-payment-intent',views.create_payment),#STRIPE
    path('stripe-webhook', views.my_webhook_view),#STRIPE

    path('backup',views.Backup_database.as_view()),
    path('generate_sitemap', views.SitemapGeneratorView.as_view(), name='generate_sitemap'),
    path('email',views.MailMail.as_view()),

]

    