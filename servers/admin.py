from django.contrib import admin
from servers.models import ServerItem, ServerList

# Register your models here.


class ServerListAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'description')


class ServerItemAdmin(admin.ModelAdmin):

    list_display = ('id', 'server_list', 'text')

admin.site.register(ServerList, ServerListAdmin)
admin.site.register(ServerItem, ServerItemAdmin)