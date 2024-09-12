const productModel = require("../../models/productModel")
const db = require('../../config/db');


const getCategoryProduct = async(req,res)=>{
    try{
        let query = `
            SELECT 
                p.product_id, 
                p.name, 
                p.image_url, 
                c.category_id, 
                c.category_name
            FROM 
                product p
            JOIN 
                (SELECT 
                    MIN(p.product_id) AS product_id,
                    pc.category_id
                 FROM 
                    product p
                 JOIN 
                    product_categories pc ON p.product_id = pc.product_id
                 GROUP BY 
                    pc.category_id) AS first_product_per_category 
                ON p.product_id = first_product_per_category.product_id
            JOIN 
                categories c ON first_product_per_category.category_id = c.category_id;
        `;
        
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

module.exports = getCategoryProduct