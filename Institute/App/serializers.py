from rest_framework import serializers
from .models import UserRegister,AdminUser,Enrollment,Student

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegister
        fields = '__all__'

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['name', 'role_name', 'email', 'password']



class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'



# class EnrollmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Enrollment
#         fields = "__all__"
#         read_only_fields = [
#             'user',
#             'remaining_amount',
#             'payment_status',
#             'total_fee',
#         ]
 

class EnrollmentSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = Enrollment
        fields = '__all__'