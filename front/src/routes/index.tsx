import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Project from "../pages/Project";
import CreateProject from "../pages/CreateProject";
import Reward from "../pages/Reward";
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
          <Route path="/categories" element={<Categories />} />
          <Route path="/project" element={<Project />} />
          <Route path="/create_project" element={<CreateProject />} />
          <Route path="/reward" element={<Reward />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
