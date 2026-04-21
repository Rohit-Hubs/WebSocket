# """
# ASGI config for Institute project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/6.0/howto/deployment/asgi/
# """

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Institute.settings')

# #application = get_asgi_application()

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# import Institute.Institute.routing

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             Institute.Institute.routing.websocket_urlpatterns
#         )
#     ),
# })

# import os
# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Institute.settings')

# django_asgi_app = get_asgi_application()

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# import Institute.App.routing

# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             Institute.App.routing.websocket_urlpatterns
#         )
#     ),
# })



import os
import django

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Institute.settings')
django.setup()

import App.routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),   # ✅ fixed
    "websocket": AuthMiddlewareStack(
        URLRouter(
            App.routing.websocket_urlpatterns
        )
    ),
})