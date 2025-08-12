import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { login, clearError } from "../../redux/Slices/authSlice";
import MeetusVRLogo from "../../assets/Logo.png";
import './login.css'

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const [formData, setFormData] = useState({
    email: "dev.aert@gmail.com",
    password: "helloworld",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(login(formData));
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const isFormValid =
    formData.email && formData.password && !errors.email && !errors.password;

  return (
    <div className="login-container">
      {/* Left Side Form Section  */}
      <div className="form-section">
        <div className="form-wrapper">
          <div className="header-section">
            <h1 className="welcome-title">Welcome back</h1>
            <p className="welcome-subtitle">
              Step into our shopping metaverse for an unforgettable shopping
              experience
            </p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-wrapper">
              <div className="input-icon">
                {/* Email Icon */}
                <svg
                  width="18"
                  height="18"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="6" width="18" height="12" rx="4" />
                  <path d="M3 6l9 8 9-8" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <span className="field-error">{errors.email}</span>
            )}
            <div className="input-group">
              <div className="input-wrapper">
                <div className="input-icon">
                  {/* Password Icon */}
                  <svg
                    width="18"
                    height="18"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="11" width="18" height="8" rx="4" />
                    <circle cx="12" cy="15" r="1.2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="button-style"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <div className="text-style">
            <span>Don't have an account? Sign up </span>
          </div>
        </div>
      </div>
      {/* Right Side image */}
      <div className="logo-section">
        <img src={MeetusVRLogo} className="logo-image" alt="Meetus VR Logo" />
      </div>
    </div>
  );
}
