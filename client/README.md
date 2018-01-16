# Boilerplate

## Development

Install `yarn` package manager:
```
npm install -g yarn
```
Install dependencies
```
yarn
```
Run:
```
yarn start
```
Build:
```
yarn build
```


## App structure

```
.
├── README.md
├── internals
│   ├── config.js
│   ├── scripts
│   │   ├── dependencies.js
│   │   ├── helpers
│   │   │   ├── checkmark.js
│   │   │   ├── progress.js
│   │   │   └── xmark.js
│   │   └── setup.js
│   └── webpack
│       ├── webpack.base.babel.js
│       ├── webpack.dev.babel.js
│       ├── webpack.dll.babel.js
│       └── webpack.prod.babel.js
├── package.json
├── postcss.config.js
├── server
│   ├── index.js
│   ├── logger.js
│   └── middlewares
│       └── frontendMiddleware.js
├── src
│   ├── app
│   │   ├── asyncRoute.js
│   │   └── index.js
│   ├── components
│   │   └── Button
│   │       └── index.js
│   ├── index.html
│   ├── index.js
│   ├── redux
│   │   ├── configureStore.js
│   │   ├── constants.js
│   │   ├── reducer.js
│   │   ├── request.js
│   │   └── sagas.js
│   ├── screens
│   │   ├── AuthScreen
│   │   │   └── ...
│   │   └── MainScreen
│   │   │   └── ...
└── yarn.lock
```
