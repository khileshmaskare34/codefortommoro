const express = require('express');
const db = require('../models/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { sendMail } = require('../nodemailer');

exports.register = (req, res)=>{
    const { firstname, lastname, email, password } = req.body;

    const saltRounds = 10;
    const myPlaintextPassword = password;

    const userEmail =  `SELECT * FROM users WHERE email = ?`;
    db.query(userEmail, [email], (err, result)=>{
        if(err){
            console.log(err);
        }
        if(result.length > 0){
           return res.send(`
                <script>
                alert('Email is already register');
                window.location.href = "/";
                </script>`
            );
        }
        bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            const sql = `INSERT INTO users (firstname, lastname, email, password) VALUES(?, ?, ?, ?)`
            const value = [firstname, lastname, email, hash]
            db.query(sql, value, (err, result)=>{
              if(err){
                console.log(err)
              }
              console.log("data inserted", result)
              res.redirect('/login')
            })
          });

    })
    
}


exports.login = (req, res)=>{

  const { email, password } = req.body;
  if(!email || !password){
    res.send("Please fill the details");
  }

  const sql = `SELECT * FROM users where email = ?`
  db.query(sql, [email], (err, result)=>{
    if(err){
      console.log(err);
    }
    console.log("data",result)
    const user = result[0];

    bcrypt.compare(password, user.password, (err, hash)=>{
      if(err){
        console.log(err);
      }
      console.log("user login")

      // jwt authentication
      const token = jwt.sign({email: user.email}, 'iamfromindiaandwhereyoufromdostcaniknoweachother', {expiresIn: '10m'})

      res.cookie("Token", token, {httpOnly: true, maxAge: 10 * 60 * 1000});

      res.render('LoggedInPage')
    })
  })
}


exports.forgot = (req, res)=>{
    const { email } = req.body;
    const userEmail =  `SELECT * FROM users WHERE email = ?`;
    db.query(userEmail, [email], (err, result)=>{
        if(err){
            console.log(err);
        }
        if(result < 0){
            return res.send(`
            <script>
            alert('Email is not register');
            window.location.href = "/";
            </script>`
        )}

        const otpCode = Math.floor(1000 + Math.random() * 9000);
        const expire_in = new Date().getTime() + 5 * 60 * 1000;

        const insertQuery = 'INSERT INTO otp(email, code, expire_in) VALUES (?, ?, ?)';
        db.query(insertQuery, [email, otpCode, expire_in], (err, result)=>{
            if(err){
                console.log(err);
            }
            console.log("0data", result);
            sendMail(req, res, email, otpCode)
            res.render("newPassword" , {email});

        })  
        
    })    
}

exports.otp = (req, res)=>{
    const {otp, email} = req.body;

    const sql = `SELECT * FROM otp WHERE email = ?`;
    db.query(sql, [email], (err, result)=>{
        if(err){
            console.log(err);
        }
       
        console.log("email",result[0])
        res.render('ChangePassword');
    })
}


exports.changePassword = (req, res)=>{
    const { newpassword } = req.body;


}