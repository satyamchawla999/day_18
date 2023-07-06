import { useAuth } from '../../Hooks/useProvideAuth';
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';

import '../../Assets/Styles/draftItem.css'

const DraftItem = (props) => {

  const auth = useAuth();
  // const user = JSON.parse(auth.user);
  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);
  const {delete1,setDelete1,item} = props;
  const { addToast } = useToasts();

  // const handleSubmit = async ()=>{

  //     const response = await auth.addProduct(item);

  //     if (response === true) {
  //         addToast("Product Added Successfully", {
  //           appearance: "success",
  //           autoDismiss: true,
  //         });
  //       } else {
  //         addToast("Product with Same Code Already Exists", {
  //           appearance: "error",
  //           autoDismiss: true,
  //         });
  //       }

  // }

  const handleSubmit = async () => {



    const response = await axios.post("http://localhost:9000/product/add-product", {
      name: item.name,
      price: item.price,
      description: item.description,
      productCode: item.productCode,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
    });

    if (response.status === 201) {
      addToast("Product Added Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast("Product with Same Code Already Exists", {
        appearance: "error",
        autoDismiss: true,
      });
    }

  }


  // const handleDelete = async () => {

  //   const response = await auth.deleteDraft(item.code);

  //   if (response === true) {
  //     addToast("Product Deleted Successfully", {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //   } else {
  //     addToast("Error In Deleting Product", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //   }

  // }

  const handleDelete = async () => {

    const response = await axios.post("http://localhost:9000/product/delete-product", { productCode: item.productCode });

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

  }


  return (
    <div className="draftItem">
      <div className="draftImageBlock">
        <img src={item.image} alt="#"></img>
      </div>

      <div className="draftInfoBlock">
        <p>Name : {item.name}</p>
        <p>Price : {item.price}</p>
        <p>About : {item.description}</p>
        <p>Code : {item.productCode}</p>
        <br></br>

        {userData.role === "Vendor" && <>
          <button style={{ backgroundColor: "#1C6BE4" }} onClick={handleSubmit} >Add Product</button>
        </>}
        <button style={{ backgroundColor: "red" }} onClick={handleDelete}>Delete</button>
      </div>


    </div>
  )
}

export default DraftItem;