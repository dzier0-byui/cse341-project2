const express = require('express');
const { body, validationResult } = require('express-validator'); 
const routes = express.Router();
const workoutsController = require('../controllers/workouts');

routes.get('/', workoutsController.getAllWorkouts);
routes.get('/:id', workoutsController.getWorkoutById);
routes.post(
    '/', 
    body('exercise')
      .trim()
      .notEmpty()
      .withMessage('Exercise is required'),
    
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required'),
    
    body('sets')
      .isInt({ min: 1 })
      .withMessage('Sets must be a positive integer'),

    body('reps')
      .isInt({ min: 1 })
      .withMessage('Reps must be a positive integer'),
    
    body('weight')
      .isFloat({ min: 0 })
      .withMessage('Weight must be a non-negative number'),

    body('datePerformed')
      .isISO8601()
      .toDate()
      .withMessage('Date must be a valid date'),

    workoutsController.createWorkout
);
routes.put(
    '/:id',
    body('exercise')
      .trim()
      .notEmpty()
      .withMessage('Exercise is required'),
    
    body('category')
      .trim()
      .notEmpty()
      .withMessage('Category is required'),
    
    body('sets')
      .isInt({ min: 1 })
      .withMessage('Sets must be a positive integer'),

    body('reps')
      .isInt({ min: 1 })
      .withMessage('Reps must be a positive integer'),
    
    body('weight')
      .isFloat({ min: 0 })
      .withMessage('Weight must be a non-negative number'),

    body('datePerformed')
      .isISO8601()
      .toDate()
      .withMessage('Date must be a valid date'),
      
    workoutsController.updateWorkout
);
routes.delete('/:id', workoutsController.deleteWorkout);

module.exports = routes;