module.exports.findProducts = async (query) => {
    try {
        const products = await Product.find({
            name: { $regex: new RegExp(query, "i") }
        });
        return products;
    } catch (err) {
        throw new Error(err.message);
    }
};