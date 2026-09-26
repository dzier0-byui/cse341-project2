const mongodb = require('../data/database');
const { validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;

const getAllWorkouts = async (req, res) => {
  //swagger.tags-['Workouts'];
  try {
    const result = await mongodb.getDatabase().db().collection('workouts').find();
    result.toArray().then((workouts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(workouts);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }  
};

const getWorkoutById = async (req, res) => {
  //swagger.tags-['Workouts'];
  const workoutId = req.params.id;    
  try {
    const result = await mongodb.getDatabase().db().collection('workouts').find({ _id: new ObjectId(workoutId)});
    result.toArray().then((workouts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(workouts[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
};

const createWorkout = async (req, res) => {
  //swagger.tags-['Workouts'];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newWorkout = {
    exercise: req.body.exercise,
    category: req.body.category,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    datePerformed: req.body.datePerformed,
    notes: req.body.notes
  }
  const response = await mongodb.getDatabase().db().collection('workouts').insertOne(newWorkout);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json({ error: 'Failed to create workout' });
  } 
};

const updateWorkout = async (req, res) => {
  //swagger.tags-['Workouts'];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const workoutId = req.params.id;
  const updatedWorkout = {
    exercise: req.body.exercise,
    category: req.body.category,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    datePerformed: req.body.datePerformed,
    notes: req.body.notes
  }
  const response = await mongodb.getDatabase().db().collection('workouts').replaceOne({ _id: new ObjectId(workoutId)}, updatedWorkout);
  if (response.modifiedCount > 0) {
    res.status(204).json(response);
  } else {
    res.status(500).json({ error: 'Failed to update workout' });
  }
};

const deleteWorkout = async (req, res) => {
  //swagger.tags-['Workouts'];
  const workoutId = req.params.id;
  const response = await mongodb.getDatabase().db().collection('workouts').deleteOne({ _id: new ObjectId(workoutId)});
  if (response.deletedCount > 0) {
    res.status(200).json(response);
  } else {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
 