import ThemeController from "../components/common/ThemeController";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="fixed top-4 right-4">
        <ThemeController />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
