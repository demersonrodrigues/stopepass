const UsersModel = require('../models/UsersModel');

class UsersService {
  
  static async getUsers() {
    return await UsersModel.getUsers();
  }

  static async getUser(id) {
    return await UsersModel.getUser(id);
  }

  static async createUser(user) {
    return await UsersModel.createUser(user);
  }

  static async updateUser(id, user) {
    await UsersModel.updateUser(id, user);
  }

  static async deleteUser(id) {
    await UsersModel.deleteUser(id);
  }
}

module.exports = UsersService;