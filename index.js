const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('views engine', 'ejs')

app.get('/', (req, res) => res.send('OK'))

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log('Listening on port ' + port))
  })
  .catch(err => console.log(err))

