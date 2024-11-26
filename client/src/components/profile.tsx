import useLogout from "@/app/client/test-cbt/hooks/useLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RESOLVE_ROLE } from "@/constants/ROLE";
import useLogoutUser from "@/hooks/useLogoutUser";
import { getAccessToken } from "@/midlewares/token";
import { IUser } from "@/types/collection/user.type";
import { useLocation, useNavigate } from "react-router-dom";

type IProfile = {
  data: IUser;
};

const Profile: React.FC<IProfile> = ({ data }) => {
  const { mutate: logoutUser } = useLogoutUser();
  const user = localStorage.getItem("username");
  const loc = useLocation();
  const isPageUser = loc.pathname.includes("/exam");
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { isLoading, error, postData } = useLogout();
  const handleLogoutUser = () => {
    // localStorage.clear();
    // navigate("/exam/login");
    postData();
  };

  const getFirstName = () => {
    return data?.first_name[0];
  };

  const getRoleName = () => {
    return RESOLVE_ROLE[data?.role];
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 items-center">
            <div className="flex gap-3">
              <p className="text-sm font-light">{getRoleName()}</p>
              <p className="text-sm">
                {isPageUser
                  ? user
                  : data
                  ? data.first_name + " " + data.last_name
                  : ""}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary justify-center items-center flex p-4 rounded-full">
              <p className="text-white text-base font-bold">{getFirstName()}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!isPageUser && (
            <DropdownMenuItem
              onClick={() => {
                if (isPageUser) {
                  handleLogoutUser();
                } else {
                  logoutUser();
                }
              }}
            >
              Logout
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Profile;
