import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials, logout } from "../store/authSlice";
import { RootState } from "../store";
import { loginUser } from "../services/api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      dispatch(setCredentials(response));
      navigate("/form");
      return { success: true };
    } catch (error) {
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const checkAuth = () => {
    const token = localStorage.getItem("userToken");

    return token;
  };

  return {
    token,
    isAuthenticated,
    login,
    logout: logoutUser,
    checkAuth,
  };
};

export default useAuth;
