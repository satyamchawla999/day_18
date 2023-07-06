import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../Hooks/useProvideAuth";
import { Layout, Space, Radio } from "antd";
import axios from "axios";
import "../Assets/Styles/common.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: ""
};

const SignUp = () => {

  const [values, setValues] = useState(initialValues);
  const auth = useAuth();
  const Navigate = useNavigate();
  const { Content } = Layout;
  const { addToast } = useToasts();



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, email, password, confirmPassword } = values;

  //   if (!name || !email || !password || !confirmPassword) {
  //     addToast("Please fill all the fields", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     addToast("Make sure password and confirm password matches", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     return;
  //   }

  //   if(values.role === "Vendor") {
  //     values['draft']=[];
  //   }

  //   if(values.role === "Coustmer") {
  //     values['draft']=[];
  //   }


  //   const response = await auth.signUp(values);

  //   if(response === true) {
  //     navigate('/sign-in');

  //     return addToast('Sign Up Successfull, please login now',{
  //       appearance: 'success',
  //       autoDismiss: true,
  //     })
  //   } else {
  //     addToast("User is already present, please login", {
  //       appearance: 'error',
  //       autoDismiss: true,
  //     });
  //   }

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = values;

    if (!name || !email || !password) {
      addToast("Please fill all the fields", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/users/sign-up", { name: name, email: email, password: password, role: role });

      if (response.status === 201) {
        Navigate("/sign-in");
        return addToast('Sign Up Successfull, please login now', {
          appearance: 'success',
          autoDismiss: true,
        })
      }

      else {
        addToast("User Is Already Present", {
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
      <Content className="container">
        <Space className="leftBlock">
          <img src="" alt="" />
        </Space>

        <Space className="rightBlock">
          <h1 className="heading">Sign Up</h1>

          <Space className="formContainer">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />

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

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
              />

              <Radio.Group
                name="role"
                value={values.role}
                onChange={handleInputChange}
              >
                <Radio value={"Admin"}>Admin</Radio>
                <Radio value={"Vendor"}>Vendor</Radio>
                <Radio value={"Coustmer"}>Coustmer</Radio>
              </Radio.Group>

              <button className="button">Sign Up</button>
            </form>
          </Space>

          <p>
            Already Have An Account? <Link to="/sign-in">Sign In</Link>
          </p>
        </Space>
      </Content>
    </Layout>
  );
};

export default SignUp;
