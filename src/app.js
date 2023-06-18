const express = require('express');
const app = express();
const cors = require('cors')
const favicon = require('express-favicon');
const logger = require('morgan');

const { 
    mainRouter, 
    parentRouter, 
    childrenRouter, 
    tasksRouter } 
    = require('./routes/index');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/favicon.ico'));

// routes
app.use('/api/v1', mainRouter);
app.use('/api/v1/parents', parentRouter);
app.use('/api/v1/children', childrenRouter);
app.use('/api/v1/tasks', tasksRouter);


module.exports = app;