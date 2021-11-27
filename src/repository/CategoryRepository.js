const Category = require('../model/Category')

class CategoryRepository {

    insert(obj){
        const category = Category.create({...obj})
        return category
    }
    
    async update(obj){
        return Category.update({...obj}, { where: { id: obj.id } })
        // const jane = await User.findByPk(user.id)
        // jane.name = user.name
        // jane.email = user.email
        // jane.save()
    }

    async delete(id){
        const jane = await Category.findByPk(id)
        jane.destroy();
    }

    findById(id){
        return Category.findByPk(id)
    }

    findByName(name){
        return Category.findAll({ where: { name: name } })
    }

    findAll(){
        return Category.findAll()
    }
}

module.exports = CategoryRepository