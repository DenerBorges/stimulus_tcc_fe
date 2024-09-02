import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRoute from "../components/PrivateRoute";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CreateProject from "../pages/CreateProject";
import ProjectCreator from "../pages/ProjectCreator";
import Project from "../pages/Project";
import Reward from "../pages/Reward";
import Donors from "../pages/Donors";
import Categories from "../pages/Categories";
import Art from "../pages/Art";
import Gastronomy from "../pages/Gastronomy";
import Game from "../pages/Game";
import Book from "../pages/Book";
import Music from "../pages/Music";
import Social from "../pages/Social";
import Technology from "../pages/Technology";
import Others from "../pages/Others";
import Profile from "../pages/Profile";
import MyProjects from "../pages/MyProjects";
import EditProject from "../pages/EditProject";
import EditReward from "../pages/EditReward";
import Search from "../pages/Search";
import Payment from "../pages/Payment";
import Moderator from "../pages/Moderator";
import SignInAdmin from "../pages/SignInAdmin";
import Admin from "../pages/Admin";
import Finance from "../pages/Finance";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GoogleOAuthProvider clientId="705568925674-u6ubt532k7q69pb7d6kdkgvld8vvk8u2.apps.googleusercontent.com">
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signinadmin" element={<SignInAdmin />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/create_project" element={<CreateProject />} />
            <Route path="/project_creator/:id" element={<ProjectCreator />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project/:id/reward" element={<Reward />} />
            <Route path="/donors/:id" element={<Donors />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/art" element={<Art />} />
            <Route path="/gastronomy" element={<Gastronomy />} />
            <Route path="/game" element={<Game />} />
            <Route path="/book" element={<Book />} />
            <Route path="/music" element={<Music />} />
            <Route path="/social" element={<Social />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/others" element={<Others />} />
            <Route path="/search" element={<Search />} />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/my_projects"
              element={
                <PrivateRoute>
                  <MyProjects />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit_project/:id"
              element={
                <PrivateRoute>
                  <EditProject />
                </PrivateRoute>
              }
            />
            <Route
              path="/project/:id/edit_reward/:id"
              element={
                <PrivateRoute>
                  <EditReward />
                </PrivateRoute>
              }
            />
            <Route
              path="/project/:id/payment/:id"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/moderator/:id"
              element={
                <PrivateRoute>
                  <Moderator />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/finance"
              element={
                <PrivateRoute>
                  <Finance />
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default RoutesApp;
