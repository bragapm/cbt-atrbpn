import { useCallback, useState } from "react";
import useLogout from "../../test-cbt/hooks/useLogout";

export const useGetSessionUser = () => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {isLoading:load,error:err,postData} = useLogout()

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
        "/user-session-tests",
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("user_token")}`,
        device: localStorage.getItem("deviceInfo"),
       },
        method: "GET",
      }
    );

      const result = await response.json();
      if(!response.ok){
        console.log(result)
        throw new Error(result?.message);
      }
      setData(result?.data[0]);
      if(result?.data[0]){
        localStorage.setItem("session_id",result?.data[0]["session-id"])
      }
    } catch (err: any) {
      if (err.message === "Invalid device. Login from another device is not allowed.") {
            alert(err.message)
            postData()
          } else {
            setError(err.message);
          }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, getSession: fetchData };
};

