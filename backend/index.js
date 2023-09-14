const express = require('express')
const app = express()
const port = 5000
const main = require('./db');
var cors = require('cors')

main()

app.use(express.json())
app.use(cors())

  //available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`)
  })