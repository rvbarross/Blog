const Account = require('../model/Account')

class AccountRepository {

    insert(obj){
        const account = Account.create({...obj})
        return account
    }
    
    async update(account){
        return Account.update({...obj}, { where: { id: account.id } })
        // const jane = await User.findByPk(user.id)
        // jane.name = user.name
        // jane.email = user.email
        // jane.save()
    }

    async delete(account){
        const jane = await Account.findByPk(account.id)
        jane.destroy();
    }

    findById(id){
        return Account.findByPk(id)
    }

    findAll(){
        return Account.findAll()
    }

    findByUsername(username){
        return Account.findAll( { where: { username: username } })
    }
}

module.exports = AccountRepository