const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const db = require('../../config/db');

async function userSignUpController(req,res){
    try{
        const { firstname,address,phonenumber,lastname ,zipcode,email,password} = req.body

        const emptyFields = [];
        if (!firstname) {
          emptyFields.push("First Name");
        }
        if (!lastname) {
          emptyFields.push("Last Name");
        }
        if (!address) {
          emptyFields.push("Address");
        }
        if (!zipcode) {
          emptyFields.push("Zip Code");
        }
        if (!phonenumber) {
          emptyFields.push("Phone Number");
        }
        if (!email) {
          emptyFields.push("Email");
        }
        if (!password) {
          emptyFields.push("Password");
        }

        if (emptyFields.length > 0) {
            res.status(400).json({
              errors: `Please fill in the following required fields: ${emptyFields.join(', ')}`,
            });
            return; // Return early to prevent further execution
          }
          db.query('select email from customer where email=?',[email], async (err, results) => {
            if (err) {
                console.log("error")
            } else {
                if (results && results.length > 0) {
                    res.json({
                        errors : 'That email is already in use '
                    });
                } 
                 else {
                    let hashPassword = await bcrypt.hash(password, 8);
                    db.query('insert into customer set ?',{first_name : firstname , last_name: lastname,address : address, zip_code : zipcode,phone_number:phonenumber, password : hashPassword , email : email},(err,results)=>{
                        if(err){
                            console.log(err)
                        }
                        else
                        {
                            res.json({
                                message: 'user registered',
                                success:true
                            });
                        }
                    })
        
                    // Continue with the rest of your code...
                }
            }
        });

    }catch(err){
        res.json({
            message : err.message || err  ,
            errors : true,
            success : false,
        })
    }
}

module.exports = userSignUpController