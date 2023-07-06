import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useProvideAuth";
import { Space } from "antd";
import { useToasts } from "react-toast-notifications";

import "../Assets/Styles/profile.css";
import { useState } from "react";

const initialValues = {
  name: "",
  image: "",
};

const Profile = () => {
  const auth = useAuth();
  const user = JSON.parse(auth.user);
  const { addToast } = useToasts();

  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.updateProfile(values);

    if (response === true) {
      addToast("Profile Updated Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast("Error In Updating Profile", {
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
      const img = URL.createObjectURL(file);
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
    auth.logOut();
  };

  return (
    <div className="profile">
      <div className="home">
        <Space className="header">
          <h1>Profile</h1>

          {auth.user ? (
            <>
              <div>
                <Link to="/profile">
                  {" "}
                  <p>{user.name}</p>
                </Link>{" "}
                <br />
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link to="/sign-in">
                  {" "}
                  <p>Sign In</p>{" "}
                </Link>{" "}
                <br />
                <Link to="/sign-up">
                  {" "}
                  <p>Sign Up</p>{" "}
                </Link>
              </div>
            </>
          )}
        </Space>
      </div>

      <div className="profileContainer">
        <div className="left">
          <img src={values.image} alt="" />
        </div>

        <div className="right">
          <div className="profileForm">
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                placeholder={user.name}
                required
              />

              <label>email</label>
              <input
                type="email"
                name="email"
                disabled
                placeholder={user.email}
              />

              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />

              <button className="addButton">Update profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
