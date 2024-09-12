const userModel = require("../../models/userModel")
const db = require('../../config/db');

async function updateUser(req,res){
    const sessionUser = req.userId;
    const { firstname, lastname, address, phonenumber, zipcode } = req.body;
    
    try {
      // Check if the required fields are not empty
      if (!firstname || !lastname || !phonenumber) {
        return res.json({
          message: 'First name, last name, and phone number are required.',
          errors: true,
          success: false,
        });
      }
    
      // Update query
      const query = `
        UPDATE Customer
        SET first_name = ?, last_name = ?, address = ?, zip_code = ?, phone_number = ?
        WHERE customer_id = ?;
      `;
    
      // Execute the query
      db.query(query, [firstname, lastname, address, zipcode, phonenumber, sessionUser], (err, results) => {
        if (err) {
          return res.json({
            message: err.message || err,
            errors: true,
            success: false,
          });
        }
        
        res.json({
          message: 'Customer information updated successfully',
          errors: false,
          success: true,
        });
      });
    } catch (err) {
      res.json({
        message: err.message || err,
        errors: true,
        success: false,
      });
    }
    
}


module.exports = updateUser