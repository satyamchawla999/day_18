import { useAuth } from "../../Hooks/useProvideAuth";
import ProductItem from "./ProductItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";



import '../../Assets/Styles/productContainer.css'



const ProductContainer = (props) => {
    const auth = useAuth();
    // const products = JSON.parse(auth.products);

    const {products,setDelete1,delete1} = props
    const { addToast } = useToasts();

    // useEffect(() => {
    //     const getProduct = async () => {
    //         const response = await axios.get("http://localhost:9000/product/get-product");
    //         setProducts(response.data);
    //     }
    //     getProduct();
    // }, [delete1]);

    const handleClick = async (code) => {
        // const response = await auth.deleteProduct(product.code);
        const response = await axios.post("http://localhost:9000/product/delete-product", { productCode: code });

        if (response.status === 201) {
            addToast("Product Deleted !", {
                appearance: "success",
                autoDismiss: true,
            });
            setDelete1(!delete1)
        } else {
            addToast("Error In Deleting Product", {
                appearance: "error",
                autoDismiss: true,
            });
        }
    };

    return (
        <div className="productContainer">

            {(products && products.length !== 0) ? <>
                {
                    products.map(((product) => (
                        <ProductItem
                            product={product}
                            key={product.productCode}
                            handleClick={handleClick}
                        />
                    )))
                }

            </> : <>
                <img className="" src={require("../../Assets/Images/empty.jpg")} />
            </>}

        </div>
    )
        ;
}

export default ProductContainer;