const express = require('express')
const router = express.Router()
const CategoryRepository = require('../repository/CategoryRepository')
const repository = new CategoryRepository()

router.get('/', (req, res) => {
    res.render('pages/dashboard', { user: req.user })
})

router.get('/categories', async (req, res) => {
    let categories = await repository.findAll()
    res.render('pages/categories', { user: req.user, categories: categories })
})

router.get('/categories/new', async (req, res) => {
    let categories = await repository.findAll()
    res.render('pages/category_new', { user: req.user, error: null })
})

router.post('/categories/new', async (req, res) => {
    let name = req.body.name
    let description = req.body.description

    if(name){
        let category = repository.findByName(name)[0]
        if(category){
            let error = {
                message: "Existing category"
            }
            res.render('pages/category_new', { user: req.user, error: error })
        } else {
            let cat = { name: name, description: description }
            repository.insert(cat)
            res.redirect('/dashboard/categories')
        }
    } else {
        let error = {
            message: "Passwords doesn't match"
        }
        res.render('pages/category_new', { user: req.user, error: error })
    }
})
module.exports = router