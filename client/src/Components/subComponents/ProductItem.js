import { useAuth } from "../../Hooks/useProvideAuth";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux/es/hooks/useSelector";

import "../../Assets/Styles/productItem.css";
import axios from "axios";


const ProductItem = (props) => {
  const {product,handleClick} = props;
  const auth = useAuth();
  // const user = JSON.parse(auth.user);
  const { addToast } = useToasts();

  const userData = useSelector((state)=>state.userData);
  const user = useSelector((state)=>state.user);

  console.log(userData)

  // const handleClick = async () => {
  //   const response = await auth.deleteProduct(product.code);

  //   if (response === true) {
  //     addToast("Product Deleted !", {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //   } else {
  //     addToast("Error In Deleting Product", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //   }
  // };

  // const handleClick = async () => {
  //   // const response = await auth.deleteProduct(product.code);
  //   const response = await axios.post("http://localhost:9000/product/delete-product",{productCode:product.productCode});
    
  //   if (response.status === 201) {
  //     addToast("Product Deleted !", {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //   } else {
  //     addToast("Error In Deleting Product", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //   }
  // };

  const handleAddToCart = async () => {
    const response = await auth.addDraft(product);

    if (response === true) {
      addToast("Product Added to Cart !", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast("Error In Adding Product", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="productItem">
      <div className="imageBlock">
        <img src={product.image} alt="#"></img>
      </div>

      <div className="infoBlock">
        <p>Name : {product.name}</p>
        <p>Price : {product.price}</p>
        <p>About : {product.description}</p>
        <p>Code : {product.productCode}</p>

        {user && (
          <>
            {userData.role === "Admin" && (
              <>
                <button className="itemButton" onClick={()=>handleClick(product.productCode)}>
                  Delete Product
                </button>
              </>
            )}

            {userData.role === "Coustmer" && (
              <>
                <button className="itemButton" style={{backgroundColor:"#1C6BE4"}} onClick={handleAddToCart}>
                  Add To Cart
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
