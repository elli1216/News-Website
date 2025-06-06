import { memo } from "react";
import PageHeader from "../../components/home/PageHeader";
import { getCurrentUser } from "../../config/firebase";

const Profile = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Profile" />
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${currentUser?.displayName}`}
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">{currentUser?.displayName}</p>
          <p className="text-sm">{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
