const express = require('express')
const router = express.Router()
const AccountRepository = require('../repository/AccountRepository')
const repository = new AccountRepository()
const passport = require('passport')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('pages/home', { user: req.user })
})

router.get('/signin', (req, res) => {
    res.render('pages/signin', { user: req.user, error: req.flash('error')[0], values: null })
})

router.post('/signin', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })
)

router.get('/signup', (req, res) => {
    res.render('pages/signup', { user: req.user, error: null, values: null })
})

router.post('/signup', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation
    
    if(password == passwordConfirmation){
        let ac = await repository.findByUsername(username)
        if(ac.length == 0){
            bcrypt.hash(password, 12, (err, hash) => {
                let account = {
                    username: username,
                    password: hash
                }
                repository.insert(account)
                res.render('pages/signup-ok', { user: req.user })

            })
        } else {
            let error = {
                message: "Username already exists"
            }
            let values = {
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
            res.render('pages/signup', { user: req.user, error: error, values: values })
        }
    } else {
        let error = {
            message: "Passwords doesn't match"
        }
        let values = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }
        res.render('pages/signup', { user: req.user, error: error, values: values })
    }
    
})

module.exports = router;