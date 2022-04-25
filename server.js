require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABA_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.error('Connected to Database'))

app.use(express.json())

const todoshhhRouter = require('./routes/todoshhh')
app.use('/todoshhh', todoshhhRouter)

app.listen(3000, () => console.log('Server Started'))

