const userModel = require("../../models/userModel")
const db = require('../../config/db');

async function userDetailsController(req,res){
    try{
        let query ='SELECT * FROM customer c where c.customer_id = ?' ;

        db.query(query,[req.userId] ,(err, results) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.json(results);
            }
        });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailsController