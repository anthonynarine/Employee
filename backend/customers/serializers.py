from rest_framework import serializers
from customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__" #alternatively you can put each field in a list
        