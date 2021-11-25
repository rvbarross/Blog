const Category = require('../model/Category')

class CategoryRepository {

    insert(obj){
        const category = Category.create({...obj})
        return category
    }
    
    async update(category){
        return Category.update({...obj}, { where: { id: category.id } })
        // const jane = await User.findByPk(user.id)
        // jane.name = user.name
        // jane.email = user.email
        // jane.save()
    }

    async delete(category){
        const jane = await Category.findByPk(category.id)
        jane.destroy();
    }

    findById(id){
        return Category.findByPk(id)
    }

    findAll(){
        return Category.findAll()
    }
}

module.exports = CategoryRepository