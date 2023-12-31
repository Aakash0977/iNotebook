const express = require('express')
const app = express()
const port = 5000
const main = require('./db');
main()

app.use(express.json())
  //available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })