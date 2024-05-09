const express = require('express');
const router = express.Router();
const Task = require('../models/items');

// Route to add a new task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Route to get all tasks categorized by priority
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    const categorizedTasks = {
      "High": [],
      "Medium": [],
      "Low": []
    };

    tasks.forEach(task => {
      categorizedTasks[task.priority].push(task);
    });

    res.send(categorizedTasks);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Route to get tasks by priority
router.get('/tasks/:priority', async (req, res) => {
  const priority = req.params.priority;
  try {
    const tasks = await Task.find({ priority });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a task by ID
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'priority', 'dueDate', 'status'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to delete a task by ID
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
