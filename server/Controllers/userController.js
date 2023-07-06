let User = require("../Model/users")

module.exports.signUp = async (req,res) => {
    try {
        let user =  await User.findOne({email: req.body.email});

        if(!user){
            user = await User.create(req.body);
            
            return res.status(201).send("User Created Successfully!");
        } else {
            res.statusMessage = "User Already Exists";
            return res.status(204).end()
        }

    } catch(err) {
        res.statusMessage = "Unable To Create User";
        return res.status(409).end();
    }
}

module.exports.signIn = async (req,res) => {
    const {email,password} = req.body;
    try {
        let user =  await User.findOne({email: email});

        if(user && user.password === password){
            return res.status(201).send(user);
        } else {
            res.statusMessage = "User Not Present";
            return res.status(204).end()
        }

    } catch(err) {
        res.statusMessage = "Unable To Sign In";
        return res.status(401).end();
    }
}

// let Product = require("../Model/product");

// module.exports.addProduct = async (req,res)=>{
//     console.log(req.body.code)
//     try {
//         let product =  await Product.findOne({code: req.body.code});
//         if(!product){            
//             product = await Product.create(req.body);
//             return res.status(201).send("Product Created Successfully!");
//         } else {
//             res.statusMessage = "Product Already Exists";
//             return res.status(204).end()
//         }

//     } catch(err) {
//         res.statusMessage = "Unable To Create Product";
//         return res.status(409).end();
//     }
// }