const mainRouter = require('./mainRoute');
const tasksRouter = require('./tasksRoute');
const parentRouter = require('./parentRoute');
const childrenRouter = require('./childrenRoute');

module.exports = {
    mainRouter,
    tasksRouter,
    parentRouter,
    childrenRouter
};

//TODO
// - remove mainRouter