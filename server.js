import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'
const morgan = require('morgan')
require('dotenv').config()

// create express app
const app = express()

// db
mongoose
	.connect(process.env.DATABASE, {
		userNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log('**DB CONNECTED**'))
	.catch((err) => console.log('DB CONNECTION ERR => ', err))

// apply middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// create routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

// We are using .env (environment variable) If the process.env.PORT variable is not 
//avaiable, we run localhost:8000

const port = process.env.PORT || 8000

//
app.listen(port, () => console.log(`Server is running on port ${port}`))
