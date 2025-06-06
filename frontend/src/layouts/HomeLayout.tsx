import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="h-full overflow-y-auto sidebar-scroll-hide">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
