const db = require('../config/database');

class UserModel {
  static async createUser(name, email, password) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result;
  }

  static async findUserByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findUserById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateUser(id, name, email, password) {
    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      [name, email, password, id]
    );
    return result;
  }
}

module.exports = UserModel;