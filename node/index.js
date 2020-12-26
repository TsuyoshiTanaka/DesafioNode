const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
connection.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('MySql Connected');
    });

const sql = `INSERT INTO people(name) values('Edson Tanaka')`
connection.query(sql)
connection.end()

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)    
    connection.connect((err) => {
        if(err){
            console.log(err);
        }
        console.log('MySql Connected');
        });

    let sql = `SELECT * FROM people;`
    var lista = '<h1>Full Cycle Rocks!</h1>';
    connection.query(sql, function (error, results, fields) {
        if (error)
            throw error;
        for (i = 0; i < results.length; i++) {
            lista += '<p>'+results[i].name+'</p>';
        }
        res.send(lista);
    });
    connection.end();
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})