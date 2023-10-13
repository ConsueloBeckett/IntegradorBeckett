const express = require('express');
const router = express.Router();

const carts = [] 

const products = [
    
    {
        id: 1,
        name: "Berenjena",
        price: 2500,
        stock: 10,
        code: "image/image1",
        description:"es una hortaliza de color morado oscuro que se utiliza en muchas preparaciones culinarias.",
        category:"verdura"
    },
    {
        id: 2,
        name: "Arandano",
        price: 5000,
        stock: 8,
        code: "image/image2",
        description:"es una fruta pequeña y dulce que se utiliza en postres y otros platos dulces.",
        category:"fruta"
    },
    {
        id: 3,
        name: "Frutilla",
        price: 3000,
        stock: 20,
        code: "image/image3",
        description:"es una fruta dulce y aromática que se utiliza en postres y otros platos dulces.",
        category:"fruta"
    },
    {
        id: 4,
        name: "Cereza",
        price: 5000,
        stock: 20,
        code: "image/image4",
        description:"es una fruta dulce y jugosa que se consume fresca o en conserva",
        category:"fruta"
    },
    {
        id: 5,
        name: "Durazno",
        price: 2500,
        stock: 15,
        code: "image/image5",        
        description:"es una fruta jugosa y dulce que se consume fresca o en conserva.",
        category:"fruta"
    }

]

//all products
router.post('/api/carts', (req, res) => {
    const cartId = carts.length + 1; 
    const cart = {
        id: cartId,
        products: []
    };

    for (let i = 0; i < 3; i++) {
        const randomProductIndex = Math.floor(Math.random() * products.length);
        const randomQuantity = Math.floor(Math.random() * 5) + 1; 
        const productToAdd = { ...products[randomProductIndex], quantity: randomQuantity };
        cart.products.push(productToAdd);
    }

    products.push(cart);

    res.json({ message: 'Succesfull added', cart });
});

router.get('/api/carts/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({  message: 'Cart not found.' });
    }

    res.json(cart);
});

router.post('/api/carts/:cid/products', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({  message: 'Cart not found.' });
    }

    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const product = products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const cartProduct = { ...product, quantity };
    cart.products.push(cartProduct)/vfc ;

    res.json({ message: 'Products added to cart', cartProduct });
});



module.exports = router;