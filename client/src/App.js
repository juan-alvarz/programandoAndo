import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Courses from "./components/Courses";
// import { useSelector } from "react-redux";

import CreateCourse from "./components/CreateCourse";

function App() {
  // const { courses } = useSelector((state) => state.programandoando);
  // console.log(courses);
  // console.log(schools);
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        {/* <h1>Hello World!!!</h1> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/createCourse" element={<CreateCourse />} />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
