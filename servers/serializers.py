__author__ = 'rothnic'
from swampdragon.serializers.model_serializer import ModelSerializer


class ServerListSerializer(ModelSerializer):
    class Meta:
        model = 'servers.ServerList'
        publish_fields = ('name', 'description')


class ServerItemSerializer(ModelSerializer):
    class Meta:
        model = 'servers.ServerItem'
        publish_fields = ('done', 'text')
        update_fields = ('done', )