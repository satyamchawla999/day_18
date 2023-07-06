import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import Home from "./Home";
import SignIn from "./SignIn"
import SignUp from './SignUp'
import Profile from "./Profile";

const Main = ()=>{
  return (
    <div className="Main">

      {/*  All Routes */}

      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default Main;
