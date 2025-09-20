import { memo } from "react";
import ThemeController from "./ThemeController";
import { logout } from "../../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Slide, ToastContainer, toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const displayName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "User";

  const handleLogout = async () => {
    try {
      toast.success("Logged out successfully!");
      await logout();
      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Scroll Report</a>
      </div>
      <ThemeController />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/home/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/home/settings">Settings</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
