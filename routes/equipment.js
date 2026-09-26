const express = require('express');
const { body, validationResult } = require('express-validator'); 
const routes = express.Router();
const equipmentController = require('../controllers/equipment');

routes.get('/', equipmentController.getAllEquipment);
routes.get('/:id', equipmentController.getEquipmentById);
routes.post(
  '/',
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
routes.delete('/:id', equipmentController.deleteEquipment);

module.exports = routes;