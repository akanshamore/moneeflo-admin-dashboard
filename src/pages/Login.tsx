import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setCredentials } from "../store/authSlice";
import { loginUser } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await loginUser(values);
      dispatch(setCredentials(response.authToken));

      localStorage.setItem("userToken", response.authToken);

      toast.success("Successfully logged in!", {
        position: "top-right",
        autoClose: 2000,
        onClose: () => navigate("/dashboard"),
      });
    } catch (err) {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
      });
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold">Sign in</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border rounded"
                  placeholder="akanshamore@gmail.com"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  className="w-full p-2 border rounded"
                  placeholder="123456"
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                )}
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Sign in
              </button>
              <Link
                to="/forgot-password"
                className="block text-center text-blue-500 hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
