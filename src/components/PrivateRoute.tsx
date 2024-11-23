import { Navigate } from "react-router-dom";
import { RootState } from "../store";
import { useAppSelector } from "../hooks/store";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
