import "./App.css";
import HomePage from "./homePage/HomePage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import Register from "./Register";
import UserDashboard from "./userDashboard/UserDashboard";
import Step1 from "./RegisterSteps/Step1";
import Step2 from "./RegisterSteps/Step2";
import Step3 from "./RegisterSteps/Step3";
import Step4 from "./RegisterSteps/Step4";
import Step5 from "./RegisterSteps/Step5";
import { useAuth } from "./context/authContext";
import Otp from "./RegisterSteps/Otp";
import ForgotPassword from "./forgotPassword/forgotPassword";
import AdminLogin from "./components/adminDashboard/adminLogin";
import AdminDashboard from "./components/adminDashboard/adminDashboard";
import AdminUser from "./components/adminDashboard/pages/AdminUser";
import ReportedUser from "./components/adminDashboard/pages/ReportedUser";
import BlockedUser from "./components/adminDashboard/pages/BlockedUser";
// import PrivacyPolicy from "./policy/PrivacyPolicy.jsx";
import TermsandConditions from "./policy/TermsandConditions";
import EditDashboard from "./editProfile/EditDashboard";
import ViewProfile from "./userDashboard/popupBoxes/ViewProfile";

const ProtectedRoutes = () => {
  const token = localStorage.getItem("token")
  console.log(token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/otp" element={<Otp />} />
      <Route path="/register/otp" element={<Otp />} />
      <Route path="/register/step1" element={<Step1 />} />
      <Route path="/register/step2" element={<Step2 />} />
      <Route path="/register/step3" element={<Step3 />} />
      <Route path="/register/step4" element={<Step4 />} />
      <Route path="/register/step5" element={<Step5 />} />
      <Route path="/profile/view" element={<ViewProfile></ViewProfile>}></Route>
      {/* <Route path="/privacypolicy" element={<PrivacyPolicy />} /> */}
      <Route path="/termsandconditions" element={<TermsandConditions />} />

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile/edit" element={<EditDashboard />} />
        <Route path="/profile/view" element={<ViewProfile />} />

      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/admindashboard/users" element={<AdminUser />} />
      <Route path="/admindashboard/reports" element={<ReportedUser />} />
      <Route path="/admindashboard/blocks" element={<BlockedUser />} />
    </Routes>
  );
}

export default App;
