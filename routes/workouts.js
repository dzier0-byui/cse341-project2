const express = require('express');
const routes = express.Router();
const workoutsController = require('../controllers/workouts');

routes.get('/', workoutsController.getAllWorkouts);
routes.get('/:id', workoutsController.getWorkoutById);
routes.post('/', workoutsController.createWorkout);
routes.put('/:id', workoutsController.updateWorkout);
routes.delete('/:id', workoutsController.deleteWorkout);

module.exports = routes;