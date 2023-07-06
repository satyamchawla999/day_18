import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Space, Radio } from "antd";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../Hooks/useProvideAuth";
import axios from "axios";
import { setUserData,setUser } from "../Features/Users/userSlice";
import { useDispatch } from "react-redux";

import "../Assets/Styles/common.css";

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {

  const [values, setValues] = useState(initialValues);
  const { Content } = Layout;
  const { addToast } = useToasts();
  const auth = useAuth();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   const { email, password } = values;

  //   if (!email || !password) {
  //     addToast("Please fill all the fields", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     return;
  //   }

  //   const response = await auth.signIn(values);

  //   if (response === true) {
  //     navigate("/");

  //     return addToast("Sign In Successfull", {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });

  //   } else {

  //     addToast("Incorrect Email or Password", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });

  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, email } = values;

    if (!email || !password) {
      addToast("Please fill all the fields", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/users/sign-in", { email: email, password: password });

      if (response.status === 201) {
        dispatch(setUserData(response.data));
        dispatch(setUser());
        Navigate("/");
        return addToast('Sign In Successfull', {
          appearance: 'success',
          autoDismiss: true,
        })
      }

      else {
        addToast("Incorrect Email or Password", {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      setValues(initialValues);

    } catch (err) {
      console.log(err);
    }

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <Layout className="backGround">
      <Content style={{ flexDirection: "row-reverse" }} className="container">
        <Space className="leftBlock">
          <img src="" alt="" />
        </Space>

        <Space className="rightBlock signIn">
          <h1 className="heading">Sign In</h1>

          <Space className="formContainer">
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
              />

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />

              <Radio.Group style={{ visibility: "hidden" }}>
                <Radio value={"Admin"}>Admin</Radio>
                <Radio value={"Vendor"}>Vendor</Radio>
                <Radio value={"Coustmer"}>Coustmer</Radio>
              </Radio.Group>

              <button className="button">Sign In</button>
            </form>
          </Space>

          <p>
            Already Have An Account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </Space>
      </Content>
    </Layout>
  );
};

export default SignIn;
