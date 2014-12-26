/**
 * Created by rothnic on 12/25/14.
 */

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: '../static/',
    paths: {
        React: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react-with-addons',
        JSXTransformer: 'https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/JSXTransformer',
        jsx: 'jsx',
        server_app: 'server_app',
        settings: 'http://localhost:9999/settings',
        swampdragon: 'swampdragon/js/swampdragon',
        datamapper: 'swampdragon/js/datamapper'
    },
    shim: {
        'swampdragon': {
            deps: ['settings']
        },
        'datamapper': {
            deps: ['swampdragon']
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['server_app/main']);