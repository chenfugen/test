# vuemodel4web

     vue project mainly builds 'Webpack' project templates that rely on the creation of 'Vue-Cli 3'(https://cli.vuejs.org/).
'Axios' (https://www.npmjs.com/package/axios) to control the normal HTTP requests, 'Vuex' (https://vuex.vuejs.org/zh/guide/)
Control of global variables, 'Vue Router' control related routing (https://router.vuejs.org/). Attach webpack proxy request configuration and global websorket configuration.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## The project structure

    |-- .gitignore                  // git File to ignore
    |-- README.md                   // Project description
    |-- babel.config.js             // ES grammar compiler
    |-- package-lock.json           // npm devDependencies version of the record
    |-- package.json                // npm devDependencies,webpack config and basic project information
    |-- vue.config.js               // webpack configuration file
    |-- public                      //public files
    |   |-- favicon.ico                 // favicon file
    |   |-- index.html                  // main html
    |-- src                         // Development section  
        |-- App.vue                     // The main components
        |-- main.js                     // The main entrance
        |-- apiConfig                   // Interactive configuration
        |   |-- api.js                      // api configuration file
        |   |-- axios.js                    // axios configuration file
        |   |-- index.js                    // The main entrance
        |-- assets                      // Static files
        |-- components                  // Global components
        |   |-- components.js               // Component import file
        |-- router                      // router configuration
        |   |-- index.js                    // The main entrance
        |   |-- routes.js                   // views Component import file
        |-- store                       // vuex library
        |   |-- index.js                    // The main entrance
        |   |-- modules                     // vuex model
        |-- style                       // Global style
        |-- utils                       // Global general function
        |   |-- websorketAll.js             // websorket global configuration
        |-- views                       // views
            |-- HelloWorld.vue
