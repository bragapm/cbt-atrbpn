import { User } from "lucide-react";

const Profile = () => {
  return (
    <div className="w-fit h-fit px-2 py-2 border border-gray-200 rounded-xl">
      <div className="w-fit h-fit p-1 bg-primary rounded-full">
        <User className="text-white" />
      </div>
    </div>
  );
};

export default Profile;
