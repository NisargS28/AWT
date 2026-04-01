from django import forms

from .models import Student


class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ["name", "email", "course", "year"]
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Student name"}),
            "email": forms.EmailInput(attrs={"placeholder": "student@example.com"}),
            "course": forms.TextInput(attrs={"placeholder": "Course name"}),
            "year": forms.NumberInput(attrs={"min": 1, "max": 6}),
        }
