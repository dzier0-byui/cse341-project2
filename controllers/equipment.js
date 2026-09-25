const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEquipment = async (req, res) => {
  //swagger.tags-['Equipment'];
  try {
    const result = await mongodb.getDatabase().db().collection('equipment').find();
    result.toArray().then((equipment) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(equipment);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }  
};

const getEquipmentById = async (req, res) => {
  //swagger.tags-['Equipment'];
  const equipmentId = req.params.id;    
  try {
    const result = await mongodb.getDatabase().db().collection('equipment').find({ _id: new ObjectId(equipmentId)});
    result.toArray().then((equipment) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(equipment[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
};

const createEquipment = async (req, res) => {
  //swagger.tags-['Equipment'];
  const newEquipment = {
    name: req.body.name,
    location: req.body.location,
    condition: req.body.condition
  }
  const response = await mongodb.getDatabase().db().collection('equipment').insertOne(newEquipment);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ error: 'Failed to create equipment' });
  } 
};

const updateEquipment = async (req, res) => {
  //swagger.tags-['Equipment'];
  const equipmentId = req.params.id;
  const updatedEquipment = {
    name: req.body.name,
    location: req.body.location,
    condition: req.body.condition
  }
  const response = await mongodb.getDatabase().db().collection('equipment').replaceOne({ _id: new ObjectId(equipmentId)}, updatedEquipment);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
};

const deleteEquipment = async (req, res) => {
  //swagger.tags-['Equipment'];
  const equipmentId = req.params.id;
  const response = await mongodb.getDatabase().db().collection('equipment').deleteOne({ _id: new ObjectId(equipmentId)});
  if (response.deletedCount > 0) {
    res.status(200).json(response);
  } else {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
};

module.exports = {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
}
   