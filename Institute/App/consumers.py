# # consumers.py
# from channels.generic.websocket import AsyncWebsocketConsumer
# import json

# class UserConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.channel_layer.group_add("users", self.channel_name)
#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard("users", self.channel_name)

#     async def send_user_update(self, event):
#         await self.send(text_data=json.dumps(event["data"]))

from channels.generic.websocket import AsyncWebsocketConsumer
import json

class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.channel_layer.group_add("users", self.channel_name)  # ✅ FIXED
        await self.accept()
        print("✅ WebSocket Connected")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("users", self.channel_name)
        print("❌ WebSocket Disconnected")

    async def send_user_update(self, event):  # ✅ MATCH BACKEND
        await self.send(text_data=json.dumps(event["data"]))

        