const mainRouter = require('./mainRoute');
const tasksRouter = require('./tasksRoute');
const parentRouter = require('./parentRoute');
const childrenRouter = require('./childrenRoute');
const rewardsRouter = require('./rewardsRoute');

module.exports = {
    mainRouter,
    tasksRouter,
    parentRouter,
    childrenRouter,
    rewardsRouter,
};

//TODO
// - remove mainRouter