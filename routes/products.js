const express = require('express')
const Product = require('./../models/product')
const router = express.Router()

router.get('/new', (req, rest) => {
    rest.render('products/new', { product: new Product})
})
router.get('/edit/:id', (req, rest) => {
    rest.render('products/edit', { product: new Product})
})

router.get('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    if (product == null) res.redirect('/')
    res.render('products/show', { product: product})
})

router.post('/', async (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })
    try {
        await product.save(product)
        res.redirect(`/products/${product.id}`)
    } catch (error) {
        console.log(error)
        res.render('products/new', { product: product})
    }
})

router.put('/:id', async (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })
    try {
        await product.save(product)
        res.redirect(`/products/${product.id}`)
    } catch (error) {
        console.log(error)
        res.render('products/edit', { product: product})
    }
})

router.delete('/:id', async (req, res) => {
    await Product.destroy(req.params.id)
    res.redirect('/')
})

function saveProductAndRedicrect(path) {
    return async(res, req) => {
        let product = req.product
            title = req.body.title,
            description = req.body.description,
            price = req.body.price
        try {
            await product.save(product)
            res.redirect(`/products/${product.id}`)
        } catch (error) {
            res.render(`products/${path}`, { product: product})
        }
    }
}

module.exports = router