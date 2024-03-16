const connection = require('../Connection');
 
class UsersModel {

    static async getUsers() {
        const [data] = (await connection).query(
            `SELECT * FROM users`);
        return data; 
    }

    static async getUser(id) {
        const [data] = (await connection).query(
            `SELECT * FROM users
             WHERE id = ?   
            `, [id]);
        console.log(data);
        return data[0];
    }

    static async createUser(user) { 
        
        const {name, date_born, cpf, email, tel, user_type} = user;

        if (await this.userExists('cpf', cpf)) {
            throw new Error('Já existe um usuário com este CPF. Insira outro CPF');
        }

        if (await this.userExists('email', email)) {
            throw new Error('Já existe um usuário com este Email. Insira outro Email');
        }

        if (await this.userExists('tel', tel)) {
            throw new Error('Já existe um usuário com este Número de telefone. Insira outro número');
        }

        const [result] = (await connection).query(`
            INSERT INTO users (name, date_born, cpf, email, tel, user_type)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [name, date_born, cpf, email, tel, user_type]);

        return {id: result.insertId};
    }

    static async updateUser (id, user) {

        const { email, tel, user_type } = user;

        if (await this.updateUserExists('email', email, id)) {
            throw new Error('Já existe um usuário com este Email. Insira outro Email');
        }
        
        if (await this.updateUserExists('tel', tel, id)) {
            throw new Error('Já existe um usuário com este Número de telefone. Insira outro número');
        }

        await connection.query(`UPDATE users SET name = ?, date_born = ?, cpf = ?, email = ?, telephone = ?, user_type = ? WHERE id = ?`, [name, date_born, cpf, email, tel, user_type, id]);
    }

    static async deleteUser(id) {
        try 
        {
            // Verifique se o usuário existe antes de tentar deletar
            const user = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
            if (user.length === 0) {
                throw new Error('Usuário não encontrado');
            }
        
            // Se o usuário existir, prossiga com a deleção
            await connection.query('DELETE FROM users WHERE id = ?', [id]);
        } 
        catch (error) 
        {
            console.error(error);
            throw new Error('Não foi possível deletar o usuário');
        }
    }

    // Validações
    static async userExists(field, value) {
        const existingUser = (await connection).query(`
          SELECT * FROM users WHERE ${field} = ?
        `, [value]);
        return existingUser.length > 0;
      }

    static async updateUserExists (field, value, deleteId) {
        const existingUser = (await connection).query(`
          SELECT * FROM users WHERE ${field} = ? AND id != ?
        `, [value, deleteId]);
        return existingUser.length > 0;
    }

}

module.exports = UsersModel;