const connecttomongo = require('./db');
const express = require('express')
var cors = require('cors')
connecttomongo();
const app = express()
const port = 5000

app.use(cors())

app.use(express.json()) 
    //Available Routes
    app.use('/api/auth', require('./routes/auth.js'))
    app.use('/api/notes', require('./routes/notes.js'))
    

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})
