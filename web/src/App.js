import logo from "./logo.svg";
import "./App.css";
// import Profile from './components/profile/Profile';
// import LoginForm from './components/login/LoginForm';
import Profile from "./components/profile/Profile";
import LoginForm from "./components/login/LoginForm";
import history from "./components/history";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Cart from "./components/dashboard/Cart";
import CardFlippy from "./components/dashboard/CardFlippy";
import ZohoD from "./components/dashboard/ZohoD";
import ZohoDashboard from "./components/dashboard/ZohoDashboard";
// import LoginPage from "./components/login/LoginPage";
import UserLogin from "./components/login/UserLogin";
import AllFeaturesGrid from "./components/griddata";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<ZohoDashboard/>} />
          <Route exact path="/" element={<UserLogin />} />
          <Route exact path="/dashboard" element={<ZohoD />} />
          <Route exact path="/griddata" element={<AllFeaturesGrid/>}/>
        </Routes>
      </Router>
      {/* <CardFlippy/> */}
    </>
  );
}

export default App;
