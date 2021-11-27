const express = require('express')
const expressLayouts = require('express-ejs-layouts')

require('dotenv').config()

const sequelize = require('./src/database')
const routes = require('./src/routes')

const session = require('express-session')
const cookieParser = require('cookie-parser')

const flash = require('connect-flash')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const AccountRepository = require('./src/repository/AccountRepository')
const bcrypty = require('bcrypt')

passport.use(new LocalStrategy(
        async (username, password, done) => {
            let repository = new AccountRepository()
            let account = await repository.findByUsername(username)

            if(account.length == 0){
                return done(null, false, {message: 'User not found'})
            }

            bcrypty.compare(password, account[0].password).then(function(result) {
                // result == true
                if(!result){
                    return done(null, false, {message: 'Invalid password'})
                }
                return done(null, account[0])
            });

            // bcrypty.compare(password, account[0].password), function(err, result) {

            //     if(err){
            //         return done(err)
            //     }

            //     if(!result){
            //         return done(null, false, {message: 'Invalid password'})
            //     }

            //     return done(null, account)
            // }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, { id: user.id })
})
passport.deserializeUser(async (obj, done) => {
    let repository = new AccountRepository()
    let account = await repository.findById(obj.id)

    return done(null, account)
})

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: process.env.SECRET_VERY_SAFE_PASSWORD,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser())
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes)

app.listen(port, async () =>{
    await sequelize.sync({ force: false })
    console.log("Server Up Baby!!");
})