const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

require('dotenv').config()

const sequelize = require('./src/database')
const routes = require('./src/routes')

const User = require('./src/model/user')
const Account = require('./src/model/Account')
const Profile = require('./src/model/Profile')
const Post = require('./src/model/Post')
const Role = require('./src/model/Role')



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.use('/', routes)

app.listen(port, async () =>{
    await sequelize.sync({ force: true })
    console.log("Server Up Baby!!");
})