class User { 
    constructor(name, date_born, cpf, email, tel, user_type) {
        this.name = name;
        this.date_born = date_born;
        this.cpf = cpf;
        this.email = email;
        this.tel = tel;
        this.user_type = user_type;
    }
}

module.exports = User;