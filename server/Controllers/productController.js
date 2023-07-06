let Product = require("../Model/product");
let Users = require("../Model/users");

module.exports.addProduct = async (req, res) => {

    // const {productCode,price,description} = req.body;
    try {
        let product = await Product.findOne({ productCode: req.body.productCode });
        if (!product) {
            // const data = new Product( {
            //     productCode:productCode,
            //     price:price,
            //     description:description
            // })  
            // data.save();
            product = await Product.create(req.body);
            return res.status(201).send("Product Created Successfully!");
        } else {
            res.statusMessage = "Product Already Exists";
            return res.status(204).end()
        }

    } catch (err) {
        res.statusMessage = "Unable To Create Product";
        return res.status(409).end();
    }
}

module.exports.addDraft = async (req, res) => {

    const {productCode,price,description,name,image,email} = req.body;
    try {
        let user = await Users.findOne({ email: email });
        if (user) {

            const data = {
                productCode:productCode,
                price:price,
                description:description,
                name:name,
                image:image,
            }
            user.draft.push(data);
            user.save();

            // const data = new Users( {
            //     productCode:productCode,
            //     price:price,
            //     description:description
            // })  
            // data.save();
            
            return res.status(201).send(user.draft);
        } else {
            res.statusMessage = "Product Already Exists";
            return res.status(204).end()
        }

    } catch (err) {
        res.statusMessage = "Unable To Create Product";
        return res.status(409).end();
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        let products = await Product.find();
        return res.status(201).send(products);

    } catch (err) {
        res.statusMessage = "Not Available";
        return res.status(409).end();
    }
}

module.exports.deleteProduct = async (req, res) => {
    console.log(req.body);
    try {
        let products = await Product.deleteOne({productCode : req.body.productCode});
        return res.status(201).send("Deleted Successfully");
    } catch (err) {
        res.statusMessage = "Not Available";
        return res.status(409).end();
    }
}