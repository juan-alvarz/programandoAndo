import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";
import Error404 from "./components/Error404";
import { useSelector } from "react-redux";
import Video from "./components/Video";
import Donators from "./components/Donators";
import AllCourses from "./components/AllCourses";
import OneCourseDetail from "./components/OneCourseDetail";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import { Favorites } from "./components/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/allCourses" element={<AllCourses />} />
          <Route path="/course/:idCourse" element={<OneCourseDetail />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/video/:idVideo/:idCourse" element={<Video />} />
          <Route path="/donators" element={<Donators />} />
          {/* Algunas rutas nuevas */}
          <Route path="/loginUser" element={<Login />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/favorites" element={<Favorites></Favorites>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;