const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    database: 'shopping',
    username: 'postgres',
    password: 1234,
    dialect: 'postgresql',
    timezone: '+03:00', // your timezone comes here, ex.: 'US/Hawaii'
})
sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');

})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

let Product = sequelize.define('product', {
    //attributes

    title: {
        type: Sequelize.STRING,
        allowNull : false
    },
    description: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull : false
    },
    createdAt: {
        type: Sequelize.DATE,
        default: () => Date.now,
    }
    
})

Product.sync({force: true})

module.exports = Product

