const express = require("express")
const {
    getProductById,
    getAllProducts,
    deleteProduct,
    updateProduct,
    addProduct,
} = require("../controllers/ProductController")

productRouter = express.Router()

productRouter.route("/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

productRouter.route("/")
    .get(getAllProducts)
    .post(addProduct)



module.exports = productRouter
