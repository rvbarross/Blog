const User = require('../model/user')

class UserRepository{

    insert(obj){
        const user = User.create({...obj})
        return user
    }
    
    async update(user){
        return User.update({...obj}, { where: { id: user.id } })
        // const jane = await User.findByPk(user.id)
        // jane.name = user.name
        // jane.email = user.email
        // jane.save()
    }

    async delete(user){
        const jane = await User.findByPk(user.id)
        jane.destroy();
    }

    find(id){
        return User.findByPk(id)
    }

    findAll(){
        return User.findAll()
    }
}

module.exports = UserRepository