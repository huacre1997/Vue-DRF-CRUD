from rest_framework import serializers
from .models import Book,Author
class BookSerializer(serializers.ModelSerializer):
  
    author_id = serializers.IntegerField(write_only=True)

    class Meta:
        model=Book
        fields = ("id","title","description","author","author_id")
        depth = 1

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Author
        fields="__all__"

