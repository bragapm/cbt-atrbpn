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
        "/rules",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` },
        method: "GET",
      }
    );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if(result?.data[0]){
        setData(result?.data[0]?.file_link || "")
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, getTatib: fetchData };
};

