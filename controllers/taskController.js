const TaskModel = require('../models/taskModel');

class TaskController {
  static async addTask(req, res) {
    const { title, dueDate, priority } = req.body;
    const userId = req.user.id;

    try {
      await TaskModel.createTask(userId, title, dueDate, priority);
      res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async viewTasks(req, res) {
    const userId = req.user.id;

    try {
      const tasks = await TaskModel.getTasksByUserId(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async editTask(req, res) {
    const { id, title, dueDate, priority, status } = req.body;

    try {
      await TaskModel.updateTask(id, title, dueDate, priority, status);
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async deleteTask(req, res) {
    const { id } = req.body;

    try {
      await TaskModel.deleteTask(id);
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async completeTask(req, res) {
    const { id } = req.body;

    try {
      await TaskModel.completeTask(id);
      res.json({ message: 'Task completed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = TaskController;