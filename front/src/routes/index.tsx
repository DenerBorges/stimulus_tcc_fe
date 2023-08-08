import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Categories from "../pages/Categories";
import Home from "../pages/Home";
import Project from "../pages/Project";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
