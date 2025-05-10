// Add Product: /api/product/add

const addProduct = async(req, res) => {
    try {
        const productData = JSON.parse(req.body.productData); // validate this input ideally
        const images = req.files;

        if (!images || !productData) {
            return res.json({ success: false, message: "Missing product data or images" });
        }

        const imagesURL = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        await Product.create({
            ...productData,
            images: imagesURL, // assuming your model expects an `images` array
        });

        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
} 
//get product /api/product/list
const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

//get single product : api/product/list
const productById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
};

 
//change product stock : api/product/stock
const changeStock = async (req, res) => {
    try {
        const { productId, newStock } = req.body;

        if (!productId || typeof newStock !== 'number') {
            return res.status(400).json({ success: false, message: "Invalid product ID or stock value" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.stock = newStock;
        await product.save();

        res.status(200).json({ success: true, message: "Stock updated", product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to update stock" });
    }
};

export {
    addProduct, changeStock, productById, productList
}
