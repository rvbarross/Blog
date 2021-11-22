const express = require('express')
const router = express.Router()
const AccountRepository = require('../repository/AccountRepository')
const repository = new AccountRepository()
const bcrypt = require('bcrypt')
const passport = require('passport')

router.get('/', (_, res) => {
    res.render('pages/home')
})

router.get('/signin', (_, res) => {
    res.render('pages/signin')
})

router.post('/signin', (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
    })
})

router.get('/signup', (_, res) => {
    res.render('pages/signup', { error: null, values: null})
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
                res.render('pages/signup-ok')

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
            res.render('pages/signup', { error: error, values: values})
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
        res.render('pages/signup', { error: error, values: values})
    }
    
})

module.exports = router;