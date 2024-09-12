const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
   const { productId } = req?.body;
   const currentUser = req.userId;

    try {
        // Check if the user already has a cart
        let [cart] = await db.promise().query(
            'SELECT * FROM Cart WHERE customer_id = ?',
            [currentUser]
        );

        if (cart.length === 0) {
            // If no cart exists for the user, create one
            const [result] = await db.promise().query(
                'INSERT INTO Cart (customer_id, cart_name, total_items, total_price) VALUES (?, ?, ?, ?)',
                [currentUser, `Cart of User ${currentUser}`, 0, 0.00]
            );
            cart = { cart_id: result.insertId };
        } else {
            cart = cart[0];
        }

        const cartId = cart.cart_id;

        // Check if the product is already in the cart
        const [cartItem] = await db.promise().query(
            'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?',
            [cartId, productId]
        );

        if (cartItem.length === 0) {
            // If the product is not in the cart, add it
            await db.promise().query(
                'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
                [cartId, productId, 1]
            );
        } else {
            // If the product is already in the cart, update the quantity
            await db.promise().query(
                'UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?',
                [cartId, productId]
            );
        }

        // Update the cart's total items and total price
        const [product] = await db.promise().query(
            'SELECT price FROM Product WHERE product_id = ?',
            [productId]
        );

        const productPrice = product[0].price;

        await db.promise().query(
            'UPDATE Cart SET total_items = total_items + 1, total_price = total_price + ? WHERE cart_id = ?',
            [productPrice, cartId]
        );

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding the product to the cart' });
    }
}


module.exports = addToCartController