const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const db = require('../../config/db');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    let success = false;

    try {
        const { email , password } = req.body;
        if(!email )
        {
            return res.status(400).json({success: success, errors: "please enter the email" })
        }
        if(!password)
        {
            return res.status(400).json({success: success, errors: "please enter the password"})
        }
         db.query('select * from customer where email = ?',[email],async( err , results)=>{
            if(!results || results.length==0) 
            {
               return res.status(401).json({
                    errors : 'email id or password is incorrect'
            })
            } 
            else if (!( await bcrypt.compare(password , results[0].password)))
            {
               return res.status(401).json({
                    errors : 'email id or password is incorrect'
            })
            } 
            
            else
               { 
                success = true;
                const id = results[0].customer_id ; 

                const token = jwt.sign({id} , process.env.TOKEN_SECRET_KEY ,{   
                    expiresIn : "90d" 
                })
                const firstname = results[0].first_name;
                // const cookieOptions = {       // setting cookies specifications 
                //     expiresIn : new Date(
                //         Date.now + 90 * 24 * 60 * 60 * 1000 
                //     ),
                //     httpOnly : true 
                // }
                res.json({ success, token, firstname ,id}) ; // token set as user 
                // res.cookie('jwt',token , cookieOptions ) 
                // res.status(200).redirect("/")       
               }
  
        })
    } catch (err) {
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }

}

module.exports = userSignInController

