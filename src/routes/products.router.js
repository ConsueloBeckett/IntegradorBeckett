const express = require('express');
const router = express.Router();

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
router.get('/api/products', (req, res) => {
    res.json({ products });
});

//id
router.get('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    console.log(pid)

    
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
});

//add
router.post('/api/products', (req, res) => {

    const newProduct = req.body;

   
    if (!newProduct.id ||
        !newProduct.name ||
        !newProduct.price ||
        !newProduct.description ||
        !newProduct.code ||
        !newProduct.stock ||
        !newProduct.category) {
            res.json({ message: 'Product added succesfully' });
       
    }else{

        return res.status(400).json({ message: 'Fill all the fields to continue' });
    }

    products.push(newProduct);

});

//add info
router.put('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'You have to add one field at least' });
    }

    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product isnt found.' });
    }

    products[productIndex] = {
        ...products[productIndex],
        ...updateFields
    };

    return res.json(products[productIndex]);
});

//delete
router.delete('/api/products/:pid', (req, res) => {
    const pid = parseInt(req.params.pid);


    const productIndex = products.find((product) => product.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product havent been found.' });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.json(deletedProduct[0]);
});


module.exports = router;