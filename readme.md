# SwampDragon ReactJS Example Project
A modification of the [SwampDragon todo's example](http://swampdragon.net/tutorial/part-1-here-be-dragons-and-thats-a-good-thing/). The intent is to eventually have a list of servers, computers, 
users, and their real-time use/patch state to manage.

**SwampDragon** provides "self-publishing" models, and subscription management for them.

**ReactJS** provides components that "react" to change in the data, by re-rendering the entire component.
React handles the complexities in deciding which aspects of the actual DOM need to be modified.

The combination of the two provides something like what Meteor.js provides, but with a python backend, and
more intuitive view rendering.

### Backend
The goal is to have a python-based backend to manage the persistence of the models, 
while providing real-time aspects as well.

### Frontend
Utilize ReactJS to provide all view rendering, with the intent of avoiding
custom view templating languages as much as possible. The frontend should be
able to operate independently of having the backend, if we can provide mock data

## Running
* Start redis-server, v2.8 or newer
* Start SwampDragon server.py file
* Run python manage.py createsuperuser
* Start Django via manage.py runserver command
* Open localhost:8000 in one browser window
* Open localhost:8000/admin in another window
* Add entries to the database via the admin interface

## ToDo
* Move static javascript dependencies to bower
* ~~Revisit dragon-react module~~ Using VanillaDragon
* Revisit dependency loading (require vs webpack, etc)
* Revisit architecture to incorporate flux concepts