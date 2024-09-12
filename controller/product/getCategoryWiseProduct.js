const productModel = require("../../models/productModel")
const db = require('../../config/db');

// const getCategoryWiseProduct = async(req,res)=>{
   
//     try{
//         const { categoryId } = req.query;
//         console.log("hello")
//         let query = 'SELECT p.* FROM product p JOIN product_categories pc ON p.product_id = pc.product_id JOIN categories c ON pc.category_id = c.category_id WHERE c.category_id = ?;';
//     if (categoryId) {
//         db.query(query, [categoryId], (err, results) => {
//             if (err) {
//               res.status(500).send(err);
//             } else {
//               res.json(results);
//             }
//           });
//       }
//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }
const getCategoryWiseProduct = async(req,res)=>{
   
    try{
        const { categoryIds } = req.query;
        if (!categoryIds) {
            return res.status(400).send("Category IDs are required");
        }

        const categoryIdsArray = categoryIds.split(',').map(id => parseInt(id.trim(), 10));
        const placeholders = categoryIdsArray.map(() => '?').join(',');

       let query = `SELECT distinct p.* FROM product p 
                     JOIN product_categories pc ON p.product_id = pc.product_id 
                     JOIN categories c ON pc.category_id = c.category_id 
                     WHERE c.category_id IN (${placeholders});`;
    if (categoryIds) {
        db.query(query, categoryIdsArray, (err, results) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(results);
            }
          });
      }
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryWiseProduct