import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import RankUserHome from "./components/RankUserHome";
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
import ForgetPassword from "./components/ForgetPassword";
import Sidebar from "./components/panelAdmin/Sidebar.jsx";
// Panel Admin
import VideosPA from "./components/panelAdmin/VideosPA";
import SchoolsPA from "./components/panelAdmin/SchoolsPA";
import CoursesPA from "./components/panelAdmin/CoursesPA";
import UsersPA from "./components/panelAdmin/UsersPA";
import Administrator from "./components/panelAdmin/Administrator";
import Baneos from "./components/panelAdmin/Baneos";
import Loader from "./components/Loader";
import { Favorites } from "./components/Favorites";
import CancelDonation from "./components/CancelDonation";
import SuccessDonation from "./components/SuccessDonation";
import Welcome from "./components/Welcome";
import Settings from "./components/panelAdmin/Settings";
import { RankUserDonation } from "./components/RankUserHome";

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateUser />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />

          <Route path="/sidebar" element={<Sidebar />} />
          {/* <Route path="/panelAdmin" element={<PanelAdmin />} /> */}

          {/* Panel Admin */}
          <Route path="/videospa" element={<VideosPA />} />
          <Route path="/schoolspa" element={<SchoolsPA />} />
          <Route path="/coursespa" element={<CoursesPA />} />
          <Route path="/userspa" element={<UsersPA />} />
          <Route path="/administrator" element={<Administrator />} />
          <Route path="/baneos" element={<Baneos />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/execute-payment" element={<SuccessDonation />} />
          <Route path="/cancel-payment" element={<CancelDonation />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/confirm/:confirmationCode" element={<Welcome />} />

          <Route path="/rankhome" element={<RankUserHome></RankUserHome>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
