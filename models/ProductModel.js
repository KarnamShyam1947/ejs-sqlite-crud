const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("./../database")

// const sequelize = new Sequelize("database", "username", "password", {
//     dialect: "sqlite",
//     host: "./database.sqlite"
// });

// sequelize.sync()

class ProductModel extends Model{}

ProductModel.init(
    {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DOUBLE
        }
    },
    {
        sequelize,
        tableName: "products",
        modelName: "productModel"  
    },
)

module.exports = ProductModel
