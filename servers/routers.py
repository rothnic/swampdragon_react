__author__ = 'rothnic'

from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from servers.models import ServerList, ServerItem
from servers.serializers import ServerListSerializer, ServerItemSerializer


class ServerListRouter(ModelRouter):
    route_name = 'server-list'
    serializer_class = ServerListSerializer
    model = ServerList

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.all()


class ServerItemRouter(ModelRouter):
    route_name = 'server-item'
    serializer_class = ServerItemSerializer
    model = ServerItem

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['id'])

    def get_query_set(self, **kwargs):
        return self.model.objects.filter(server_list__id=kwargs['list_id'])


route_handler.register(ServerListRouter)
route_handler.register(ServerItemRouter)