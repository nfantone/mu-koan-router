# mu-kōän-router 公案-ルータ
[![Build Status](https://travis-ci.org/nfantone/mu-koan-router.svg?branch=master)](https://travis-ci.org/nfantone/mu-koan-router)

> Automatic routes discovery and declaration for [mu-kōän][1] applications.

[![js-semistandard-style](https://cdn.rawgit.com/flet/semistandard/master/badge.svg)](https://github.com/Flet/semistandard)

```sh
npm i --save mu-koan-router
```

## Usage
Write your _controllers_ (see below) and place them under a single root directory. Tell `mu-koan-router` where you store them and let the module do the setup for you.

```javascript
'use strict';
/**
 * Configures a Koa app and exports it.
 */
const Koa = require('koa');
const router = require('mu-koan-router');

// Create Koa app instance
let app = new Koa();

// Setup routes using controllers found
// on ./routes directory and configure them
// under a "/v1" namespace.
router.declareRoutes(app, {
  root: path.join(__dirname, 'routes'),
  prefix: '/v1'
});

// Export the configured application
module.exports = app;
```


### Controllers
A _controller_ is node module that exports a `function` that receives a `koa-router` instance and declares something on it. All controllers must be defined under a single root directory (but can be nested as needed).

For example,

```javascript
'use strict';
/**
 * Implementation of API /hello endpoint.
 * @module routes/hello
 */
const moment = require('moment');

/**
 * Set up /hello endpoint.
 * @param  {Object} router A Koa router
 */
module.exports = function(router) {
  /**
   * GET /hello
   *
   * Returns a simple hello world
   * text and a timestamp.
   */
  router.get('/hello', (ctx) => {
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Hello from mu-koan!',
      timestamp: moment().format('l')
    };
  });
};

```

## License
MIT

[1]: https://www.npmjs.com/mu-koan
