const express = require('express')
const router = express.Router()
const ensureAuthenticated = require('../middleware/auth')
const CategoryRepository = require('../repository/CategoryRepository')
const repository = new CategoryRepository()

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('pages/dashboard', { user: req.user })
})

router.get('/categories', ensureAuthenticated, async (req, res) => {
    let categories = await repository.findAll()
    res.render('pages/categories', { user: req.user, categories: categories })
})

router.get('/categories/new', ensureAuthenticated, async (req, res) => {
    let options = {
        formName: 'New Category',
        buttonName: 'Register',
        category: null,
        url: '/dashboard/categories/new'
    }

    res.render('pages/category_new', { option: options, user: req.user, error: null })
})

router.get('/categories/edit/:id', ensureAuthenticated, async (req, res) => {
    let id = req.params.id
    let category = await repository.findById(id)

    let options = {
        formName: 'Edit Category',
        buttonName: 'Edit',
        category: category,
        url: '/dashboard/categories/edit'
    }

    res.render('pages/category_edit', { option: options, user: req.user, error: null })
})

router.post('/categories/remove/:id', ensureAuthenticated, async (req, res) =>{
    let id = req.params.id
    repository.delete(id)
    res.redirect('/dashboard/categories')
})

router.post('/categories/edit', ensureAuthenticated, async (req, res) => {
    let id = parseInt(req.body.id)
    let name = req.body.name
    let description = req.body.description
    let category = await repository.findById(id)

    let options = {
        formName: 'Edit Category',
        buttonName: 'Edit',
        category: category,
        url: '/dashboard/categories/edit'
    }

    if(name.length > 0){
        let cat = {id: id, name: name, description: description }

        repository.update(cat)

        res.redirect('/dashboard/categories')
    } else {
        let error = {
            message: "Field can not be empty"
        }
        res.render('pages/category_edit', { option: options, user: req.user, error: error })
    }

})

router.post('/categories/new', ensureAuthenticated, async (req, res) => {
    let name = req.body.name
    let description = req.body.description

    let options = {
        formName: 'New Category',
        buttonName: 'Register',
        category: null,
        url: '/dashboard/categories/new'
    }

    if(name.length > 0){
        let category = await repository.findByName(name)
        if(category[0]){
            let error = {
                message: "Existing category"
            }
            res.render('pages/category_new', { option: options, user: req.user, error: error })
        } else {
            let cat = { name: name, description: description }
            repository.insert(cat)
            res.redirect('/dashboard/categories')
        }
    } else {
        let error = {
            message: "Name's field obrigatory"
        }
        res.render('pages/category_new', { option: options, user: req.user, error: error })
    }
})
module.exports = router