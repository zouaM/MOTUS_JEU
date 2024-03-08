const express = require('express')
const app = express()
const path = require('path')
const os = require('os')
const port = process.env.PORT || 3000
const port2 = 3001
const port3 = 4000

app.get('/os', (req,res) =>{
    res.send(os.hostname() + " port " + port )
})
app.get('/port', (req,res) =>{
    res.send(os.hostname() + " port " + port3 )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  