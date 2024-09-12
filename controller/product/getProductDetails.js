const productModel = require("../../models/productModel")
const db = require('../../config/db');

const getProductDetails = async(req,res)=>{
    try{
        const { productId } = req.body

        let query ='SELECT distinct p.* FROM product p where p.product_id = ?' ;
        
        db.query(query,[productId] ,(err, results) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    }catch(err){
        res.json({
            message : err?.message  || err,
            error : true,
            success : false
        })
    }
}

module.exports = getProductDetails