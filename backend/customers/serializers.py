import email
from rest_framework import serializers
from customers.models import Customer
from django.contrib.auth.models import User



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__" #alternatively you can put each field in a list
        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User #this is a default django User model see above import 
        fields = "__all__"
    
    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data["username"],
            email = validated_data["email"]          
        )
        
        user.set_password(validated_data["password"])
        user.save()
        return user
        
        
        