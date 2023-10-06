import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import CreateProject from "../pages/CreateProject";
import Project from "../pages/Project";
import Reward from "../pages/Reward";
import Categories from "../pages/Categories";
import Art from "../pages/Art";
import Gastronomy from "../pages/Gastronomy";
import Game from "../pages/Game";
import Book from "../pages/Book";
import Music from "../pages/Music";
import Technology from "../pages/Technology";
import Profile from "../pages/Profile";
import EditProject from "../pages/EditProject";
import EditReward from "../pages/EditReward";
// import Search from "../pages/Search";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create_project" element={<CreateProject />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/:id/reward" element={<Reward />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/art" element={<Art />} />
          <Route path="/gastronomy" element={<Gastronomy />} />
          <Route path="/game" element={<Game />} />
          <Route path="/book" element={<Book />} />
          <Route path="/music" element={<Music />} />
          <Route path="/technology" element={<Technology />} />
          {/* <Route path="/search" element={<Search />} /> */}

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
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
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
