const express = require('express')
const bodyParser = require ('body-parser');
const morgan = require('morgan')
const session = require('express-session')

const dbConnection = require('./database')

const MongoStore = require('connect-mongo')(session)

const passport = require('./passport')
const app = express()
const PORT = 8080

const user = require('./routes/user')

app.use(morgan('dev'));



app.use(bodyParser.urlencoded({extended: false}));


app.use(bodyParser.json()); // for parsing application/json

// express-session management
app.use(
    session({
        secret: 'green-india',  //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())

// Then start the passport session. The below code calls serializeUser and deserializeUser
app.use(passport.session())



app.use('/user', user)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT} `)
})