const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const data = require("./component/data")
const port = 3000
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("login.ejs")
})

app.get("/404", (req, res) => {
    res.render("404.ejs")
})

app.use("/user", require("./router/user"))
app.use("/event", require("./router/event"))
app.listen(port, () => {
    console.log(`server started at port ${port}`)
})