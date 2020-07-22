
const express = require('express')
const app = express()
const port = 9000
var PromiseFtp = require('promise-ftp');
var ftp = new PromiseFtp();
const { Pool, Client } = require('pg')
const client = new Client()
const pool = new Pool()

// connect to localhost:21 as anonymous
app.get('/', (req, res) => {
    ftp.connect({
        host: 'pure-ftpd',
        user: 'admin',
        password: 'password123456'
    }).then(() => {
        return ftp.list('/');
    }).then(rootDir => {
        ftp.end();
        res.send(rootDir);
    });
});

app.get('/db-test', (req, res) => {
    pool.query('SELECT NOW()', (err, dbRes) => {
        console.log(err, dbRes)
        res.send(dbRes);
    })
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

 
