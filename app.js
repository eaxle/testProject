const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fb_db'
})
connection.connect()
app.use(express.json());
app.get('/', function (req, res) {
    connection.query('select * from `post`', function (err, rows, fields) {
        if (err) throw err
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(rows)
        /*res.send(JSON.stringify(rows))*/
        res.json(rows);
    })
})
app.post('/', function (req, res) {
    console.log(req.body)
    if (req.body.post != null || req.body.post != undefined)
    connection.query('Insert into post(`post`) values ('+'"' + req.body.post+'"'+')', function (err, rows, fields) {
        if (err) throw err
        res.sendStatus(200)
    })
})
app.post('/comment', function (req, res) {
    console.log(req.body.comment)
    console.log(req.body.post_id)
    if (req.body.comment != null || req.body.id != null || req.body.id != undefined || req.body.comment !="")
    connection.query('Insert into `comment` (`comment`,`post_id`) values ('+'"' + req.body.comment+'",'+'"'+req.body.post_id+'"'+')', function (err, rows, fields) {
        if (err) throw err
        res.sendStatus(200)        
    })
})
app.get('/comment/:id', function (req, res) {
    connection.query('select * from `comment` where post_id='+req.params.id, function (err, rows, fields) {
        if (err) throw err
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(rows)
        res.send(JSON.stringify(rows))
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
