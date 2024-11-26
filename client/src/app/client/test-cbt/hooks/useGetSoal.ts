import { useCallback, useState } from "react";
import useLogout from "./useLogout";

export const useGetSoal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);
  const sesiId = localStorage.getItem("session_id")
  const {isLoading:load,error:err,postData} = useLogout()

  const fetchData = useCallback(async (problem_id:any,notClear=true) => {
    if(notClear){
      setData(null)
      setIsLoading(true);
    }
    setError(null);
    try {
      const response = await fetch(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
        `/user-tests/${sesiId}?problem_id=${problem_id}`,
      {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("user_token")}`, 
          device: localStorage.getItem("deviceInfo")  
        },
        method: "GET",
      }
    );

      const result = await response.json();
      if(!response.ok){
        console.log(result)
        throw new Error(result?.message);
      }
      setData(result?.data);
    } catch (err: any) {
      if (err.message === "Device tidak valid. Login dari device tidak diperbolehkan.") {
        alert(err.message)
        postData()
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data,isLoading, error, getSoal: fetchData };
};

