const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 3000
const fs = require('fs')
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

let resultList = [{Hand: "78s",Result: "Win"},{Hand: "AA",Result: "Loss"},{Hand: "AQo",Result: "Loss"}]

var allinList = JSON.parse(fs.readFileSync( __dirname + "/data.json", 'UTF-8'));

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/index.html")   
})

app.get("/allin/:id", (req, res) =>{
    console.log(req.params.id)
    var id = +req.params.id
    console.log(id)
    var allin = allinList.find(a => a.ID == id);
    console.log(allin)
    console.log(allinList)
    res.send(allin);
})
app.get("/results", (req, res) =>{
    res.send(resultList)
})
app.get("/remove", (req, res) =>{
    resultList.pop()
    res.send("Result Removed")
})

app.get("/addResult", (req, res) =>{
    res.sendFile(__dirname + "/resultform.html")
})

app.post("/addResult", (req, res) =>{
    let hand = req.body.Hand
    let result = req.body.Result

    resultList.push({Hand: `${hand}`, Result: `${result}`})
    res.send("Result Added")
})

app.listen(PORT, () =>{

})


