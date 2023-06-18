# Think of your model as the database table

from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100, unique=True)
    industry = models.CharField(max_length=100)