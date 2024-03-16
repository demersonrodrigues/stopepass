const UserModel = require('../models/UsersModel');

class UserService {
  
  static async getUsers() {
    return await UserModel.getUsers();
  }

  static async getUser(id) {
    return await UserModel.getUser(id);
  }

  static async createUser(user) {
    return await UserModel.createUser(user);
  }

  static async updateUser(id, user) {
    await UserModel.updateUser(id, user);
  }

  static async deleteUser(id) {
    await UserModel.deleteUser(id);
  }
}

module.exports = UserService;