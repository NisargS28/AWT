from django.shortcuts import get_object_or_404, redirect, render
from django.db.models import Q, Avg

from .forms import StudentForm
from .models import Student


def dashboard(request):
    students = Student.objects.all()
    
    total_students = students.count()
    total_courses = students.values("course").distinct().count()
    avg_year = students.aggregate(Avg("year"))["year__avg"] or 0
    year_1_count = students.filter(year=1).count()
    
    context = {
        "total_students": total_students,
        "total_courses": total_courses,
        "avg_year": f"{avg_year:.1f}",
        "year_1_count": year_1_count,
    }
    return render(request, "students/home.html", context)


def home(request):
	return redirect("dashboard")


def student_list(request):
	search_query = request.GET.get("search", "")
	students = Student.objects.all()
	
	if search_query:
		students = students.filter(
			Q(name__icontains=search_query)
			| Q(email__icontains=search_query)
			| Q(course__icontains=search_query)
		)
	
	return render(
		request,
		"students/student_list.html",
		{"students": students, "search_query": search_query},
	)


def student_create(request):
	if request.method == "POST":
		form = StudentForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect("student_list")
	else:
		form = StudentForm()

	return render(
		request,
		"students/student_form.html",
		{"form": form, "title": "Add Student", "button_label": "Create"},
	)


def student_update(request, pk):
	student = get_object_or_404(Student, pk=pk)
	if request.method == "POST":
		form = StudentForm(request.POST, instance=student)
		if form.is_valid():
			form.save()
			return redirect("student_list")
	else:
		form = StudentForm(instance=student)

	return render(
		request,
		"students/student_form.html",
		{"form": form, "title": "Edit Student", "button_label": "Update"},
	)


def student_delete(request, pk):
	student = get_object_or_404(Student, pk=pk)
	if request.method == "POST":
		student.delete()
		return redirect("student_list")

	return render(request, "students/student_confirm_delete.html", {"student": student})
