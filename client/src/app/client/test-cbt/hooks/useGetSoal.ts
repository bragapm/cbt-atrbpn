import { useCallback, useState } from "react";

export const useGetSoal = () => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const sesiId = localStorage.getItem("sesi_id")

  const fetchData = useCallback(async (problem_id:any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
        `/user-tests/${sesiId}?problem_id=${problem_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` },
        method: "GET",
      }
    );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, getSoal: fetchData };
};

