from django.db import models
class StudentModel(models.Model):
    name=models.CharField(max_length=50)
    dept=models.CharField(max_length=50)
    role=models.CharField(max_length=50)
    def __str__(self):
        return self.name
# Create your models here.
