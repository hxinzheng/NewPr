const express = require('express')
const app = express()
const path = require("path")

app.use('/', express.static(path.resolve(__dirname, "../build/dev")))
app.get("/data", (req,res) => {
    const list = [{name : 'ramroll'}, {name : 'tony'}, {name : "stczar"}]
    res.send(JSON.stringify(list))
})
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../index.html"))    
})
app.listen(3001)

