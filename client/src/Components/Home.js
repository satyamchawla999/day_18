import { ProductContainer, DraftContainer } from "./subComponents";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useProvideAuth";
import { useToasts } from "react-toast-notifications";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { deleteUser, setUserData } from "../Features/Users/userSlice";
import axios from "axios";

import "../Assets/Styles/home.css";

const initialValues = {
  name: "",
  price: "",
  description: "",
  code: "",
  image: null
};

const Home = () => {

  const auth = useAuth();
  // const user = JSON.parse(auth.user);
  const [values, setValues] = useState(initialValues);


  const userData = useSelector((state) => state.userData);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [draft, setDraft] = useState([]);
  const [delete1, setDelete1] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get("http://localhost:9000/product/get-product");
      setProducts(response.data);
      setDraft(userData.draft);
    }
    getProduct();
  }, [delete1]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let response = false;

  //   if(user.role === "Vendor" ) {
  //     response = await auth.addDraft(values);
  //   } else {
  //     response = await auth.addProduct(values);
  //   }


  //   if (response === true) {
  //     addToast("Product Added Successfully", {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //   } else {
  //     addToast("Product with Same Code Already Exists", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //   }

  //   setValues(initialValues);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, code } = values

    let response;
    if (userData.role === "Vendor") {

      response = await axios.post("http://localhost:9000/product/add-draft", {
        email:userData.email,
        name: name,
        price: price,
        description, description,
        productCode: code,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
      });

      if (response.status === 201) { 
        setDraft(response.data);
        const data = {...userData,draft:response.data};
        console.log(data)
        dispatch(setUserData(data));
      }

    } else {

      response = await axios.post("http://localhost:9000/product/add-product", {
        name: name,
        price: price,
        description, description,
        productCode: code,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png"
      });

    }



    if (response.status === 201) {
      addToast("Product Added Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setDelete1(!delete1)
    } else {
      addToast("Product with Same Code Already Exists", {
        appearance: "error",
        autoDismiss: true,
      });
    }

    setValues(initialValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      const img = URL.createObjectURL(file)
      setValues((prevValues) => ({
        ...prevValues,
        [name]: img,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleLogout = () => {
    dispatch(deleteUser())
  };

  return (
    <div className="home">

      <Space className="header">

        <h1>Home</h1>

        {user ? <>
          <div>
            <Link to="/profile"> <p>{userData.name}</p></Link> <br />
            <button onClick={handleLogout}>Logout</button>
          </div>
        </> : <>
          <div>
            <Link to="/sign-in"> <p>Sign In</p> </Link> <br />
            <Link to="/sign-up"> <p>Sign Up</p> </Link>
          </div>
        </>}

      </Space>

      <div className="products">
        <div className="productSection">
          <h4>Products</h4>
          <ProductContainer products={products} delete1={delete1} setDelete1={setDelete1} />
        </div>

        {user && <>
          {(userData.role === "Vendor" || userData.role === "Coustmer") && <>
            <div className="draft">
              {userData.role === "Coustmer" ? <><h4>Cart</h4></> : <><h4>Draft</h4></>}
              <DraftContainer draft={draft} delete1={delete1} setDelete1={setDelete1}/>
            </div>
          </>}
        </>}

        {user &&
          <> {userData.role !== "Coustmer" && <>
            <div className="formSection">
              <h4>Form</h4>
              <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  required
                />

                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleInputChange}
                  required
                />

                <label>Description</label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleInputChange}
                  required
                ></textarea>

                <label>Product Code</label>
                <input
                  type="number"
                  name="code"
                  value={values.code}
                  onChange={handleInputChange}
                  required
                />

                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                />

                <button className="addButton">
                  {userData.role === 'Vendor' ? <>Add To Draft</> : <>Add Product</>}
                </button>
              </form>
            </div>

          </>}
          </>}



      </div>
    </div>
  );
};

export default Home;
