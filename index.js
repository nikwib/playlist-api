'use strict';

require('dotenv').config();

const Koa = require('koa');
const app = new Koa();

const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');

const config = require('./config');
const router = require('./router');

const errorHandler = require('./errorMiddleware');

require('./db');

/**
 * Middleware
 */
app.use(cors());
app.use(logger());
app.use(bodyParser());

//Its catching any errors that happen downstream, awaits them, then logs what it catches
app.use(errorHandler);

/**
 * Routes
 */
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port).on('error', err => {
  console.error(err);
});

console.log(`Server now listening on: ${config.port}`);
