from django.contrib import admin

from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = ("name", "email", "course", "year", "created_at")
	search_fields = ("name", "email", "course")

# Register your models here.
