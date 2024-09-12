const productModel = require("../../models/productModel")
const db = require('../../config/db');

const getProductController = async(req,res)=>{
    try{
        let query ='SELECT distinct p.* FROM product p' ;
        
        db.query(query, (err, results) => {
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

module.exports = getProductController