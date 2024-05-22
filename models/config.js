const mysql = require('mysql')


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})
db.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log("connected to db");

    // create database
    const createDatabase =  `CREATE DATABASE IF NOT EXISTS codefortommoro`;
    db.query(createDatabase, (err, result)=>{
        if(err){
            console.log(err);
        }
        console.log("DataBase created");


        // select the new database
        db.changeUser({database: 'codefortommoro'}, (err)=>{
            if(err){
                console.log(err);
            }
            console.log("selected new database");
        })

        const createTable = `CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        )`

       const  createTable2 = `CREATE TABLE otp(
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(100) NOT NULL,
            code INT NOT NULL,
            expire_in BIGINT NOT NULL
        )`
        db.query(createTable, (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log("Table created")
        })
        db.query(createTable2, (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log("Table created")
        })

    })
})


module.exports = db;