const express = require('express')
const router = express.Router()

const UserRepository = require('../repository/user-repo')

const uRepo = new UserRepository()


router.use(express.json())

router.get('/', async (_, res) => {
    const users = await uRepo.findAll()
    resp = {
        status: 'OK',
        data: users
    }
    res.status(200).json(resp)
})

router.get('/:id', async (req, res) => {
    let uid = req.params.id
    let chosenUser = await uRepo.find(uid)

    if(chosenUser == undefined){
        resp = {
            status: 'ERROR',
            description: `User with id ${uid} not was found`
        }
        res.status(404).json(resp)
        return;
    }

    resp = {
        status: 'OK',
        data: chosenUser
    }

    res.status(200).json(resp)
})

router.post('/', async (req, res) => {
    let body = req.body

    if(body.name == undefined || body.email == undefined){
        resp = {
            status: 'ERROR',
            description: 'User JSON with id, name and email fields must be provided.'
        }
        res.status(404).json(resp)
        return;
    }

    const user = await uRepo.insert(body)

    resp = {
        status: 'OK',
        data: `User with id ${user.id} was inserted with success.`
    }

    // res.status(200).send(JSON.stringify(resp))
    res.status(200).json(resp)
})

router.put('/:id', async (req, res) => {
    let uid = req.params.id
    let u = req.body

    if(u.name == undefined || u.email == undefined){
        resp = {
            status: 'ERROR',
            description: 'User JSON must be provided.'
        }
        res.status(400).json(resp)
        return;
    }

    let chosen_user = await uRepo.find(uid)

    if(chosen_user == undefined){
        resp = {
            status: 'ERROR',
            description: `User with id ${uid} not was found`
        }
        res.status(404).json(resp)
        return;
    }

    chosen_user.name = u.name
    chosen_user.email = u.email

    uRepo.update(chosen_user)

    resp = {
        status: 'OK',
        data: 'User updated with success.'
    }

    res.status(200).json(resp)
})

router.delete('/:id', async (req, res) => {
    let uid = req.params.id
    let chosenUser = await uRepo.find(uid)

    if(chosenUser == undefined){
        resp = {
            status: 'ERROR',
            description: `User with id ${uid} not was found`
        }
        res.status(404).json(resp)
        return;
    }

    uRepo.delete(chosenUser)

    resp = {
        status: 'OK',
        data: `User with id ${uid} deleted with success.`
    }

    res.status(200).json(resp)
})

module.exports = router