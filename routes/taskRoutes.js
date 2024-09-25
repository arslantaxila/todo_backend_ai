const express = require('express');
const TaskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, TaskController.addTask);
router.get('/view', authMiddleware, TaskController.viewTasks);
router.put('/edit', authMiddleware, TaskController.editTask);
router.patch('/completed', authMiddleware, TaskController.completeTask);
router.delete('/delete', authMiddleware, TaskController.deleteTask);

module.exports = router;