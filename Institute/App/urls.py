from django.contrib import admin
from django.urls import path, include
from . import views   # ✅ already correct

urlpatterns = [
   path('register/', views.register_user),
   path('verify/', views.login_user),

   path('register_student/', views.register_student),

   path('students/', views.get_students),
   #path('enroll/', views.create_enrollment),
   path('enrollments/', views.get_enrollments, name='get_enrollments'),

   # ⚠️ fix delete (needs id)
   path('delete_student/<int:pk>/', views.delete_student),

   # ✅ FIXED HERE
   path('enroll/', views.create_enrollment),
   path('payment/', views.make_payment),
   #path('enroll/<int:id>/', views.get_enrollment),


   path('google-login/', views.google_login),
]