from customers.models import Customer
from customers.serializers import CustomerSerializer
from django.http import JsonResponse


def customers (request):
    #invoke serializer and return to client
    #data is taken in serialized and returned
    data = Customer.objects.all()
    #this will give us all our customer objects
    serializer = CustomerSerializer(data, many=True )
    return JsonResponse({"customers": serializer.data})
    #we are rutuning the Json compatible verson of the customers