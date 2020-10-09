from django.db import models
class Author(models.Model):
    name=models.CharField(verbose_name="Nombre autor",max_length=50)
    last_name=models.CharField(verbose_name="Apellido autor",max_length=50)
    def __str__(self):
        return self.name
    
class Book(models.Model):
    title=models.CharField(verbose_name="Titulo", max_length=50)
    description=models.CharField(verbose_name="Descripción", max_length=50)
    author=models.ForeignKey(Author, verbose_name="Autor", on_delete=models.CASCADE)

    
