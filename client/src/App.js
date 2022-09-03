import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Courses from "./components/Courses";
<<<<<<< HEAD
import CreateCourse from "./components/CreateCourse";
import Error404 from "./components/Error404";
import { useSelector } from "react-redux";
import Video from "./components/Video";
import Donators from "./components/Donators";

function App() {
  // const { courses } = useSelector((state) => state.programandoando);
  // console.log(courses);
  // console.log(schools);
  return (
    <BrowserRouter>
      <div className="App">
=======
import { useSelector } from "react-redux";
import schools from "./utils/data";

function App() {
  const { courses } = useSelector((state) => state.programandoando);
  console.log(courses);
  console.log(schools);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <h1>Hello World!!!</h1>
>>>>>>> 5789ac6 (redux and navbar)
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
<<<<<<< HEAD
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/video" element={<Video />} />
          <Route path="/donators" element={<Donators />} />
          <Route path="*" element={<Error404 />} />
=======
          <Route path="/aboutUs" element={<AboutUs />} />
>>>>>>> 5789ac6 (redux and navbar)
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
