const express = require('express');
const { body, validationResult } = require('express-validator'); 
const routes = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const equipmentController = require('../controllers/equipment');

routes.get('/', equipmentController.getAllEquipment);
routes.get('/:id', equipmentController.getEquipmentById);
routes.post(
  '/',
  isAuthenticated,
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),

  body('condition')
    .trim()
    .notEmpty()
    .withMessage('Condition is required'),

  equipmentController.createEquipment
);
routes.put(
    '/:id',
    isAuthenticated,
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),

  body('condition')
    .trim()
    .notEmpty()
    .withMessage('Condition is required'),

    equipmentController.updateEquipment);
routes.delete('/:id', isAuthenticated, equipmentController.deleteEquipment);

module.exports = routes;