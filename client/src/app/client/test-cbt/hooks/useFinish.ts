import { useState } from 'react';
import axios from 'axios';

interface PostDataProps {
  feedback: string;
  user_session_id:number
}

const useFinish = () => {
  const [error, setError] = useState<string | null>(null);
  const [data,setData] = useState(null)
  const [loadingFinish, setIsLoading] = useState(false);
  const auth = localStorage.getItem("user_token")

  const finishExam = async (data: PostDataProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
          `/user-session-tests/finish`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            device: localStorage.getItem("deviceInfo")
          },
        }
      );
      setData(response.data.data)
    } catch (error: any) {
      setError(error.message);
      console.error('Terjadi kesalahan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    loadingFinish,
    error,
    finishExam,
  };
};

export default useFinish;