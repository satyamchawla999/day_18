import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [products, setProducts] = useState(localStorage.getItem("products"));

  useEffect(() => {}, [user, products]);

  const addDraft = (values) => {
    const vendor = JSON.parse(user);

    vendor["draft"].push(values);
    const email = vendor.email;

    const getCurrentItem = localStorage.getItem("items");
    let currentItem = [];

    if (getCurrentItem) {
      currentItem = JSON.parse(getCurrentItem);
    }

    for (let i = 0; i < currentItem.length; i++) {
      if (currentItem[i].email === email) {
        currentItem[i] = vendor;
        break;
      }
    }

    localStorage.setItem("items", JSON.stringify(currentItem));

    localStorage.setItem("user", JSON.stringify(vendor));

    setUser(localStorage.getItem("user"));

    return true;
  };

  const deleteDraft = (code) => {
    console.log(user);
    const vendor = JSON.parse(user);
    console.log("v1", vendor);

    const draft = vendor.draft;

    const newDraft = draft.filter((item) => item.code !== code);
    vendor.draft = newDraft;
    console.log("v2", vendor);

    const getCurrentItem = localStorage.getItem("items");
    let currentItem = [];

    if (getCurrentItem) {
      currentItem = JSON.parse(getCurrentItem);
    }

    for (let i = 0; i < currentItem.length; i++) {
      if (currentItem[i].email === vendor.email) {
        currentItem[i] = vendor;
        console.log(currentItem[i]);
        break;
      }
    }

    localStorage.setItem("user", JSON.stringify(vendor));

    localStorage.setItem("items", JSON.stringify(currentItem));

    setUser(localStorage.getItem("user"));

    return true;

    // const vendor = JSON.parse(user);
    // const { email } = vendor.email;
    // const draft = vendor.draft;

    // const newDraft = draft.filter((item) => item.code !== code);
    // vendor.draft = newDraft;

    // const getCurrentItem = localStorage.getItem('items');
    // let currentItem = [];

    // if (getCurrentItem) {
    //   currentItem = JSON.parse(getCurrentItem);
    // }

    // for (let i = 0; i < currentItem.length; i++) {
    //   if (currentItem[i].email === email) {
    //     currentItem[i] = vendor;
    //     break;
    //   }
    // }

    // localStorage.setItem('items', JSON.stringify(currentItem));
    // localStorage.setItem('user', JSON.stringify(vendor));

    // setUser(localStorage.setItem('user',JSON.stringify(vendor)));

    // return true;
  };

  const addProduct = (values) => {
    let result = true;
    const getProducts = localStorage.getItem("products");

    if (getProducts === null) {
      let data = [];
      data.push(values);
      localStorage.setItem("products", JSON.stringify(data));
    } else {
      const currentProducts = JSON.parse(getProducts);

      for (let product of currentProducts)
        if (product.code === values.code) return false;

      if (result === true) {
        currentProducts.push(values);
        localStorage.setItem("products", JSON.stringify(currentProducts));
      }
    }

    setProducts(localStorage.getItem("products"));

    return result;
  };

  const deleteProduct = (code) => {
    const getCurrentItem = localStorage.getItem("products");

    if (getCurrentItem !== null) {
      const currentItem = JSON.parse(getCurrentItem);

      let currentProducts = currentItem.filter((item) => item.code !== code);

      localStorage.setItem("products", JSON.stringify(currentProducts));
      setProducts(localStorage.getItem("products"));
      return true;
    }
    return false;
  };

  const signIn = (values) => {
    const { email, password } = values;

    const getCurrentItem = localStorage.getItem("items");

    if (getCurrentItem === null) {
      return false;
    } else {
      const currentItem = JSON.parse(getCurrentItem);

      const foundItem = currentItem.find(
        (item) => item.email === email && item.password === password
      );

      if (foundItem) {
        localStorage.setItem("user", JSON.stringify(foundItem));
        setUser(localStorage.getItem("user"));
        return true;
      }
    }
    return false;
  };

  const updateProfile = (values)=>{
    const person = JSON.parse(user);

    person.name = values.name;
    if(values.image.length !== 0 ) {
      person.image = values.image;
    }

    const email = person.email;

    const getCurrentItem = localStorage.getItem("items");
    let currentItem = [];

    if (getCurrentItem) {
      currentItem = JSON.parse(getCurrentItem);
    }

    for (let i = 0; i < currentItem.length; i++) {
      if (currentItem[i].email === email) {
        currentItem[i] = person;
        break;
      }
    }

    localStorage.setItem("items", JSON.stringify(currentItem));

    localStorage.setItem("user", JSON.stringify(person));

    setUser(localStorage.getItem("user"));

    return true;

  }

  const signUp = (values) => {
    let result = true;
    const getCurrentItem = localStorage.getItem("items");

    if (getCurrentItem === null) {
      let data = [];
      data.push(values);
      localStorage.setItem("items", JSON.stringify(data));
      return result;
    } else {
      const currentItem = JSON.parse(getCurrentItem);

      for (let item of currentItem)
        if (item.email === values.email) return false;

      if (result === true) {
        currentItem.push(values);
        localStorage.setItem("items", JSON.stringify(currentItem));
      }
    }
    return result;
  };

  const logOut = () => {
    const user = localStorage.getItem("user");

    if (user !== null) {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return {
    user,
    signIn,
    signUp,
    logOut,
    products,
    addProduct,
    deleteProduct,
    addDraft,
    deleteDraft,
    updateProfile
  };
};
