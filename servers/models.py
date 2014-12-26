from django.db import models
from swampdragon.models import SelfPublishModel
from servers.serializers import ServerListSerializer, ServerItemSerializer


class ServerList(SelfPublishModel, models.Model):
    serializer_class = ServerListSerializer
    name = models.CharField(max_length=100)
    description = models.TextField()


class ServerItem(SelfPublishModel, models.Model):
    serializer_class = ServerItemSerializer
    server_list = models.ForeignKey(ServerList)
    done = models.BooleanField(default=False)
    text = models.CharField(max_length=100)