const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const JWTService = require('../services/jwtService');
const { validationResult } = require('express-validator');

class UserController {
  static async signup(req, res) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await UserModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.createUser(name, email, hashedPassword);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = JWTService.generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async updateProfile(req, res) {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.updateUser(userId, name, email, hashedPassword);

      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = UserController;