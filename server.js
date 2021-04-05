const express = require('express')
const productRouter = require('./routes/products')
const app = express()
const Product = require('./models/product')
const methodOverride = require('method-override')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
app.get('/', async (req,res) => {
    const products = await Product.findAll()
    res.render('products/index', {products: products})
});
app.delete('/products/:id',  (req, res) => {
    Product.findByPk(req.params.id).then(function(product){
         product.destroy()
    })
    res.redirect('/')
})

app.use('/products', productRouter);

app.listen(5000)