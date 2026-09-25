const express = require('express');
const routes = express.Router();
const equipmentController = require('../controllers/equipment');

routes.get('/', equipmentController.getAllEquipment);
routes.get('/:id', equipmentController.getEquipmentById);
routes.post('/', equipmentController.createEquipment);
routes.put('/:id', equipmentController.updateEquipment);
routes.delete('/:id', equipmentController.deleteEquipment);

module.exports = routes;