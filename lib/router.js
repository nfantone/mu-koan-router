'use strict';
/**
 * Routes initializer. Dynamic loading of
 * all entry points in `.js` files inside a root directory.
 *
 * @module lib/router
 */
const Router = require('koa-router');
const logger = require('mu-koan-logger');
const glob = require('glob');
const path = require('path');
const url = require('url');

// Module API
module.exports = {
  declareRoutes
};

/**
 * Makes a route namespace absolute, by prepending a
 * a separator character at its start.
 *
 * @method absolutity
 * @param  {String}   prefix The route namespace (or prefix).
 * @return {String}          The absolute prefix.
 */
function absolutity(prefix) {
  return prefix ? url.resolve('/', prefix) : prefix;
}

/**
 * Configures routes automatically from a set
 * path to a directory containing `.js` files
 * interpreted as controllers.
 *
 * @method declareRoutes
 * @param  {Object} app     A Koa app instance
 * @param  {Object} options koa-router settings and a `root`,
 *                          indicating the base path to the controllers.
 * @return {Object}         A configured Router instance
 */
function declareRoutes(app, options) {
  var log = logger.get(options);
  options.prefix = absolutity(options.prefix);
  var router = new Router(options);
  var controllers = glob.sync(path.join(options.root, '**/*.js'));
  if (controllers && controllers.length) {
    controllers.forEach((file) => {
      var route = path.parse(file);
      route = path.join(route.dir, route.name);
      log.info('Configuring routes for [%s%s]', options.prefix || '', route.substr(options.root.length));
      require(route)(router);
    });
    app.use(router.routes(), router.allowedMethods());
  }
  return router;
}
