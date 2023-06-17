from customers.models import Customer
from customers.serializers import CustomerSerializer
from django.http import JsonResponse



#function view to get all customers
def customers (request):
    #invoke serializer and return to client
    #data is taken in serialized and returned
    data = Customer.objects.all()
    #this will give us all our customer objects
    serializer = CustomerSerializer(data, many=True )
    return JsonResponse({"customers": serializer.data})
    #we are rutuning the Json compatible verson of the customers
    
#function view to ge a single customer
def customer(request, id):
    data = Customer.objects.get(pk=id)
    #we specify which cusomer we want with the pk setting it = to the id 
    # which we pass in. this comes from the url (see url.py path)
    serializer = CustomerSerializer(data)
    return JsonResponse({"customer": serializer.data})

