const express = require("express")
const userdata = require("../component/data")
const router = express.Router()
const dbCon = require("./../db")
const record = require("./../component/record")
const { v4: uuidv4 } = require('uuid')


router.post("/add", (req, res) => {
    if (record.data) {
        (async function () {
            const newId = uuidv4()
            const sql = "insert into event (eventid,eventname,starttime,endtime,description,userid) values (?,?,?,?,?,?)"
            const dbConnection = await dbCon()
            const data = await dbConnection.query(sql, [newId, req.body.name, req.body.start, req.body.end, req.body.desc, userdata.userid])
            return data
        })().then((response) => {
            console.log(response);
            res.redirect("../user/view_dashboard")
        }).catch((e) => {
            console.log(e);
        })
    } else {
        res.redirect("/404")
    }
})


router.get("/edit/:id", (req, res) => {
    if (record.data) {

        var event = record.data.filter((item) => item.eventid == req.params.id)
        res.render("dashboard_editevent.ejs", { event })
    } else {
        res.redirect("/404")
    }

})


router.post("/update/:id", (req, res) => {
    (async function () {
        var sql = "UPDATE event SET eventname = ?, starttime= ?, endtime= ?, description= ? WHERE eventid = ?;"
        const dbConnection = await dbCon()
        const data = await dbConnection.query(sql, [req.body.name, req.body.start, req.body.end, req.body.desc, req.params.id])
        return data
    })().then((response) => {
        res.redirect("/user/view_dashboard")
    }).catch((e) => {
        res.json(e)
    })
})

module.exports = router