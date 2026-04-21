from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import UserRegister,AdminUser,Student,Enrollment
from .serializers import UserRegisterSerializer,StudentSerializer


from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@api_view(['POST'])
def register_user(request):
    data = request.data

    # check email exists
    if UserRegister.objects.filter(email=data.get('email')).exists():
        return Response({"error": "Email already exists"}, status=400)

    serializer = UserRegisterSerializer(data=data)

    if serializer.is_valid():
        user = serializer.save()

        # 🔥 SEND REAL-TIME MESSAGE TO ADMIN
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "users",
            {
                "type": "send_user_update",
                "data": {
                    "message": "new_user",
                    "user": {
                        "id": user.id,
                        "name": user.full_name,
                        "email": user.email
                    }
                }
            }
        )

        return Response({
            "message": "User registered successfully",
            "data": serializer.data
        }, status=201)

    return Response(serializer.errors, status=400)

 
@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
   
    admin = AdminUser.objects.filter(email=email).first()
    if admin:
        if password == admin.password:  
            return Response({
                "message": "Admin Login successful",
            }, status=200)
        else:
            return Response({"error": "Invalid password"}, status=401)
       
    user = UserRegister.objects.filter(email=email).first()
    if user:
        if password == user.password:  
            return Response({
                "message": "User Login successful",
                "type": "user",
                "data": {
                    "name": getattr(user, "name", getattr(user, "username", "")),  # safe
                    "email": user.email
                }
            }, status=200)
        else:
            return Response({"error": "Invalid password"}, status=401)
       
    return Response({"error": "User not found"}, status=404)
 
 
@api_view(['POST'])
def register_student(request):
    serializer = StudentSerializer(data=request.data)
   
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
   
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
@api_view(['DELETE'])
def delete_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
 
    student.delete()
    return Response({"message": "Deleted successfully"}, status=204)
 


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Enrollment, Course
from .serializers import EnrollmentSerializer


@api_view(['POST'])
def create_enrollment(request):
    from django.shortcuts import get_object_or_404

    course_id = request.data.get("course_id")
    course = get_object_or_404(Course, id=course_id)

    enrollment = Enrollment.objects.create(
        title=course.name,   # ✅ fixed
        course=course,
        total_fee=course.fee,
        amount_paid=0
    )

    return Response(EnrollmentSerializer(enrollment).data)


@api_view(['POST'])
def make_payment(request):
    enrollment_id = request.data.get("enrollment_id")
    amount = float(request.data.get("amount"))

    try:
        enrollment = Enrollment.objects.get(id=enrollment_id)
    except Enrollment.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    # ❌ Prevent extra payment
    if amount > float(enrollment.remaining_amount):
        return Response({"error": "Amount exceeds remaining"}, status=400)

    # ✅ Update payment
    enrollment.amount_paid += amount
    enrollment.save()

    return Response({
        "paid": enrollment.amount_paid,
        "remaining": enrollment.remaining_amount,
        "status": enrollment.payment_status
    })



 
# @api_view(['POST'])
# def create_enrollment(request):
#     data = request.data.copy()
 
#     print("📥 INCOMING DATA:", data)
 
#     email = data.get("email")  # expecting email in request
#     if not email:
#         return Response({"error": "Email is required to associate a user"}, status=400)
 
#     try:
#         user = UserRegister.objects.get(email=email)
#     except UserRegister.DoesNotExist:
#         return Response({"error": "User with this email does not exist"}, status=404)
 
#     items = data.get("items", [])
#     if not items or not isinstance(items, list):
#         return Response({"error": "No items provided"}, status=400)
 
#     # keep items as it is
#     data['items'] = items
 
#     # combine all titles into one column
#     titles = [item.get("title", "") for item in items if item.get("title")]
#     data['title'] = " | ".join(titles) if titles else "Untitled Course"
 
#     # map amount_paid
#     data['amount_paid'] = data.get('amount', 0)
#     data.pop("amount", None)
 
#     # remove email from data since we already resolved user
#     data.pop("email", None)
 
#     # serialize
#     serializer = EnrollmentSerializer(data=data)
#     if not serializer.is_valid():
#         print("❌ ERRORS:", serializer.errors)
#         return Response(serializer.errors, status=400)
 
#     # save enrollment with user assigned
#     enrollment = serializer.save(user=user)
 
#     print("✅ SAVED (single row):", enrollment.id)
 
#     return Response({
#         "message": "Enrollment created ✅",
#         "data": EnrollmentSerializer(enrollment).data
#     }, status=201)
 

@api_view(['POST'])
def create_enrollment(request):
    data = request.data.copy()
    print("📥 INCOMING DATA:", data)

    from django.shortcuts import get_object_or_404

    # 🔥 CASE 1: FRONTEND sends course_id (OLD FLOW)
    if data.get("course_id"):
        course = get_object_or_404(Course, id=data.get("course_id"))

        enrollment = Enrollment.objects.create(
            title=course.name,
            course=course,
            total_fee=course.fee,
            amount_paid=0
        )

        return Response({
            "message": "Enrollment created (course_id flow) ✅",
            "data": EnrollmentSerializer(enrollment).data
        }, status=201)

    # 🔥 CASE 2: NEW FLOW (EMAIL + ITEMS)
    email = data.get("email")
    if not email:
        return Response({"error": "Email is required to associate a user"}, status=400)

    try:
        user = UserRegister.objects.get(email=email)
    except UserRegister.DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=404)

    items = data.get("items", [])
    if not items or not isinstance(items, list):
        return Response({"error": "No items provided"}, status=400)

    data['items'] = items

    titles = [item.get("title", "") for item in items if item.get("title")]
    data['title'] = " | ".join(titles) if titles else "Untitled Course"

    data['amount_paid'] = data.get('amount', 0)
    data.pop("amount", None)
    data.pop("email", None)

    serializer = EnrollmentSerializer(data=data)
    if not serializer.is_valid():
        print("❌ ERRORS:", serializer.errors)
        return Response(serializer.errors, status=400)

    enrollment = serializer.save(user=user)

    print("✅ SAVED:", enrollment.id)

    # 🔥 REALTIME NOTIFICATION
    from channels.layers import get_channel_layer
    from asgiref.sync import async_to_sync

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "users",
        {
            "type": "send_user_update",
            "data": {
                "message": "new_enrollment",
                "enrollment": {
                    "id": enrollment.id,
                    "user": user.full_name,
                    "email": user.email,
                    "course": enrollment.title
                }
            }
        }
    )

    return Response({
        "message": "Enrollment created ✅",
        "data": EnrollmentSerializer(enrollment).data
    }, status=201)

@api_view(['GET'])
def get_students(request):
    students = Student.objects.all().order_by('-id')  # latest first
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)
 
@api_view(['GET'])
def get_enrollments(request):
    """
    Retrieve all enrollments from the database
    """
    # enrollments = Enrollment.objects.all()
    enrollments = Enrollment.objects.select_related('user').all()  # get all rows
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response({
        "message": "Enrollments retrieved ✅",
        "data": serializer.data
    })
 

from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserRegister

GOOGLE_CLIENT_ID = "197646807484-25cqldbcpkevgfatc0v7muvc1r0qfca0.apps.googleusercontent.com"
#GOOGLE_CLIENT_ID = "290824585249-4kohl4it0hpbq79bm4d3s96ev05i5ome.apps.googleusercontent.com"


@api_view(['POST'])
def google_login(request):
    token = request.data.get("token")

    if not token:
        return Response({"error": "No token provided"}, status=400)

    try:
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID
        )

        email = idinfo.get("email")
        name = idinfo.get("name")

        if not email:
            return Response({"error": "Email not found"}, status=400)

        # ✅ Save in UserRegister
        user, created = UserRegister.objects.get_or_create(
            email=email,
            defaults={
                "full_name": name,
                "phone": "0000000000",
                "password": ""  # no password for Google users
            }
        )

        # ✅ MANUAL JWT (important fix)
        refresh = RefreshToken()
        refresh["user_id"] = user.id
        refresh["email"] = user.email

        return Response({
            "message": "Login successful",
            "user": {
                "email": user.email,
                "name": user.full_name
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "is_new_user": created
        })

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

@api_view(['POST'])
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = UserRegister.objects.get(email=email)

        if user.password != password:
            return Response({"error": "Invalid password"}, status=400)

        refresh = RefreshToken()
        refresh["user_id"] = user.id
        refresh["email"] = user.email

        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {   # ✅ ADD THIS
                "full_name": user.full_name,
                "email": user.email,
                "phone": user.phone
            }
        })

    except UserRegister.DoesNotExist:
        return Response({"error": "Email not found"}, status=400)