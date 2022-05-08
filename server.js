require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () =>  console.error('Connected to Database'))

// Passport config
require('./config/passport')(passport)

// Session middleware *above passport*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

const todoshhhRouter = require('./routes/todoshhh')
app.use('/todoshhh', todoshhhRouter)

app.listen(process.env.PORT, () => console.log('Server Started'))
