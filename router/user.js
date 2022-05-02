const express = require("express")
const userdata = require("../component/data")
const router = express.Router()
const dbCon = require("./../db")
const record = require("./../component/record")

async function getEvent(isadmin, userid) {
    const dbConnection = await dbCon()
    if (isadmin == 1) {
        const data = await dbConnection.query("select * from event")
        return data
    } else {
        const data = await dbConnection.query("select * from event where userid= ?", [userid])
        return data
    }
}

router.post("/login_validation", (req, res) => {
    (async function getdata() {
        const { username, password } = req.body
        const dbConnection = await dbCon()
        const data = await dbConnection.query("select * from users where username= ? and password= ?", [username, password])
        return data
    })().then((data) => {
        if (data.length == 1) {
            //login success

            console.log("login success")
            userdata.userid = data[0].userid
            userdata.username = data[0].username
            userdata.password = data[0].password
            userdata.isadmin = data[0].isadmin
            res.redirect("/user/view_dashboard")
        } else {
            console.log("login failed");
            res.render("login.ejs")
        }
    }).catch((e) => {
        console.log(e)
    })
})

router.get('/view_dashboard', (req, res) => {
    if (userdata.userid) {

        getEvent(userdata.isadmin, userdata.userid).then((data) => {
            record.data = data
            res.render("dashboard-view.ejs", { data: data })

        })
    } else {
        res.redirect("/404")
    }
})

router.get("/add_event", (req, res) => {
    res.render("dashboard_add_event.ejs")
})


module.exports = router