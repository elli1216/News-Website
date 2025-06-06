import { useState, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Bookmark,
  User,
  Menu,
  ArrowLeftToLine,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser } = useAuth();
  const name = currentUser?.displayName;
  const firstName = name?.split(" ")[0];
  const lastName = name?.split(" ")[1];

  const menuItems = [
    { icon: <Home size={20} />, text: "Home", to: "/home" },
    { icon: <TrendingUp size={20} />, text: "Trending", to: "/home/trending" },
    { icon: <Bookmark size={20} />, text: "Saved", to: "/home/saved" },
    { icon: <User size={20} />, text: "Profile", to: "/home/profile" },
  ];

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  return (
    <div
      className={`flex h-screen bg-base-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full w-full">
        <SideBarHeader
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <SidebarMenuItems isCollapsed={isCollapsed} menuItems={menuItems} />
        <SidebarFooter
          isCollapsed={isCollapsed}
          name={name || null}
          firstName={firstName || null}
          lastName={lastName || null}
        />
      </div>
    </div>
  );
};

const SideBarHeader = memo(
  ({
    isCollapsed,
    toggleSidebar,
  }: {
    isCollapsed: boolean;
    toggleSidebar: () => void;
  }) => {
    return (
      <>
        {/* Header */}
        {isCollapsed ? (
          <div className="flex items-center justify-center p-4 border-b border-base-300">
            <button
              onClick={toggleSidebar}
              className="btn btn-ghost btn-sm self-center"
            >
              <Menu size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center p-4 border-b border-base-300">
            <div className="flex items-center justify-end w-full gap-2">
              <button
                onClick={toggleSidebar}
                className="btn btn-ghost btn-sm self-center"
              >
                <ArrowLeftToLine size={20} />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
);

const SidebarMenuItems = memo(
  ({
    isCollapsed,
    menuItems,
  }: {
    isCollapsed: boolean;
    menuItems: { icon: React.ReactNode; text: string; to: string }[];
  }) => {
    return (
      <div className="menu p-2 flex-1 w-full">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300"
            >
              <span>{item.icon}</span>
              {!isCollapsed && <span>{item.text}</span>}
            </Link>
          </div>
        ))}
      </div>
    );
  }
);

const SidebarFooter = memo(
  ({
    isCollapsed,
    name,
    firstName,
    lastName,
  }: {
    isCollapsed: boolean;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
  }) => {
    return (
      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${firstName}+${lastName}`}
                alt="User"
              />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-md font-medium">{name}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default memo(Sidebar);
