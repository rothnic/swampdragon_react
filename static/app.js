/**
 * Created by rothnic on 12/25/14.
 */

// Main App Loader Config
// swampdragon, settings, and datamapper aren't AMD modules so are in global namespace
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

// Require the Server App main execution point
// This then means that anything it requires will be loaded as well
requirejs(['server_app/main']);