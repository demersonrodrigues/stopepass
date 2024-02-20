const connection = require('./connection');

const getAllUsers = () => {
    const users = connection.then();
};

module.exports = {
    getAllUsers,
};