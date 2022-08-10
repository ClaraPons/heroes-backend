const express = require("express")
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const port = 5003

const getHeroes = require('./routes/heroes')

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

app.use('/heroes', getHeroes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
