from customers.models import Customer
from customers.serializers import CustomerSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes #tell us which methods are allowed Json, html and so on
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


#function view to get all customers + create a new customer
    #invoke serializer and return to client
    #data is taken in, serialized and returned
@api_view(["GET", "POST"]) #api view must be above permision classes
@permission_classes([IsAuthenticated])
def customers (request):
    if request.method == "GET":
        dbData = Customer.objects.all()
        #this will give us all our customer objects
        serializer = CustomerSerializer(dbData, many=True )
        return Response({"customers": serializer.data})
        #we are rutuning the Json compatible verson of the customers
    if request.method == "POST":
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"customer":serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
        
     
#function view to get, delete or update a single customer
@api_view(["GET", "POST", "DELETE"]) #api view must be above permision classes
@permission_classes([IsAuthenticated])
def customer(request, id):
    try:
    #we specify which cusomer we want with the pk setting it = to the id 
    # which we pass in. this comes from the url (see url.py path)
        dbData = Customer.objects.get(pk=id)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)  
    
    if request.method == "GET":
        serializer = CustomerSerializer(dbData)
        return Response({"customer": serializer.data})
    elif request.method == "DELETE":
        dbData.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "POST":
        serializer = CustomerSerializer(dbData, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"customer": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        #we get the data from the db then the new data is passed to
        # a param called data which comes from request.data. we also 
        # check to see if the data is valid and not incorrect with
        # the .is_valid method. if the serialzer is bad we return
        # the 400 as shown above
        
        
def register():
    ...
        

