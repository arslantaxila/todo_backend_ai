const db = require('../config/database');

class TaskModel {
  static async createTask(userId, title, dueDate, priority) {
    console.log(userId, title, dueDate, priority);
    const [result] = await db.execute(
      'INSERT INTO tasks (user_id, title, due_date, priority) VALUES (?, ?, ?, ?)',
      [userId, title, dueDate, priority]
    );
    // console.log(result);
    return result;
  }

  static async getTasksByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
  }

  static async updateTask(id, title, dueDate, priority, status) {
    const [result] = await db.execute(
      'UPDATE tasks SET title = ?, due_date = ?, priority = ?, status = ? WHERE id = ?',
      [title, dueDate, priority, status, id]
    );
    return result;
  }

  static async deleteTask(id) {
    const [result] = await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return result;
  }

  static async completeTask(id) {
    const [result] = await db.execute(
      'UPDATE tasks SET status = "Completed" WHERE id = ?',
      [id]
    );
    return result;
  }
}

module.exports = TaskModel;