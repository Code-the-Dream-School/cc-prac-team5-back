const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const { 
    mainRouter, 
    parentRouter, 
    childrenRouter, 
    tasksRouter,
    rewardsRouter,
 } 
    = require('./routes/index');

// middleware
app.use(bodyParser.json());
app.use(cors());
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