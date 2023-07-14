const express = require('express');
const app = express();
const favicon = require('express-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//security
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

const { 
    mainRouter, 
    parentRouter, 
    childrenRouter, 
    tasksRouter,
    rewardsRouter,
 } 
    = require('./routes/index');

// middleware
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowsMs: 15 * 60 * 1000,
        max: 100,
    })
);
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
app.use('/api/v1/parents', parentRouter);
app.use('/api/v1/children', childrenRouter);
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/rewards', rewardsRouter);
app.use('/api/v1', mainRouter);


module.exports = app;