const routes = require('express').Router();
const workoutsController = require('../controllers/workouts');
const equipmentController = require('../controllers/equipment');

routes.use('/', require('./swagger'));

routes.use('/equipment', require('./equipment'));
routes.use('/workouts', require('./workouts'));

module.exports = routes;