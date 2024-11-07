import { useCallback, useState } from "react";

export const useGetUserTatib = () => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
        "/user-session-tests",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` },
        method: "GET",
      }
    );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result?.data[0]);
      if(result?.data[0]){
        localStorage.setItem("session_id",result?.data[0]["session-id"])
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, getTatib: fetchData };
};

