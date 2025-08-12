import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/Slices/authSlice";
import './dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome, {user?.name || "User"}</h1>
        <div className="dashboard-info">
          <p>
            <span>User ID:</span> {user?.id}
          </p>
          <p>
            <span>Name:</span> {user?.name}
          </p>
        </div>
        <button onClick={handleLogout} className="button-style">
          Logout
        </button>
      </div>
    </div>
  );
}
