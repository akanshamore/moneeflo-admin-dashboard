import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import MultiStepForm from "./pages/MultiStepForm";

// Import required styles
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import "./index.css";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { setCredentials } from "./store/authSlice";

function App() {
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = checkAuth();
    if (token) {
      dispatch(setCredentials(token));
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <MultiStepForm />
            </PrivateRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
