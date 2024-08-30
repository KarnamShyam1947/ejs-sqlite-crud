const ProductModel = require("./../models/ProductModel")

const findProductByName = async (queryName) => {
    const product = await ProductModel.findOne(
        {
            where: {
                name: queryName
            }
        }
    )

    return product;
}

const findProductById = async (productId) => {
    try {
        const product = await ProductModel.findOne({
            where: {
                id: productId
            }
        });

        if (product) {
            return product;
        }

        throw new Error("Product Not Found");
    } catch (error) {
        throw error;
    }
};

const getAllProducts = async (req, res) => {
    const products = await ProductModel.findAll();
    res.status(200).json(products);
}

const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await ProductModel.findOne({ where: { id: productId } });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product Not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error retrieving product" });
    }
};

const addProduct = async (req, res) => {
    const product = await findProductByName(req.body.name);
    if (product) {
        return res.status(409).json({
            error: "Product already exists with same name"
        })
    }

    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    })
}

const updateProduct = async (req, res) => {
    const pId = req.params.id;
    const { name, price, description } = req.body;

    try {
        const product = await findProductById(pId);

        if(name)
            product.name = name
        
        if(price)
            product.price = price
        
        if(description)
            product.description = description

        product.save();

        res.status(200).json({
            message: "Product Details Update"
        })
    } catch (error) {
        return res.status(404).json({
            error: "Product Not Found"
        })
    }
}

const deleteProduct = async (req, res) => {
    const pId = req.params.id;

    try {
        await findProductById(pId);
    } catch (error) {
        return res.status(404).json({
            error: "Product Not Found"
        })
    }

    await ProductModel.destroy({
        where: {
            id: pId
        }
    })

    res.status(200).json({
        message: "Product deleted Successfully"
    })
}

module.exports = {
    findProductByName,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    addProduct
}
