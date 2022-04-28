const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const methodOverride = require('method-override')

const app = express()

app.use(methodOverride('_method'))
app.use(cors())
app.use(
  express.json({
    extended: true,
  }),
) //copybookserver12-gmailcom/copybook
app.set('view engine', 'ejs')

const mongoURI =
  'mongodb+srv://developer:admin@copybookdb.cgwbp.mongodb.net/copybookDB?retryWrites=true&w=majority'

app.use('/api', require('./routes/index.routes'))

app.use('/', express.static(path.join('client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 3001

async function start() {
  try {
    const connect = await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    app.listen(PORT, () =>
      console.log(`[INFO]: Server has been started on port ${PORT}...!`),
    )
  } catch (e) {
    console.log(`[INFO]: Server error: ${e}...!`)
    process.exit(1)
  }
}

start()
