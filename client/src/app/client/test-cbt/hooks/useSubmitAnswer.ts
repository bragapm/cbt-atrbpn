import { useState } from 'react';
import axios from 'axios';

interface PostDataProps {
  problem_id: number;
  answer_id: string;
}

const useSubmitAnswer = () => {
  const [error, setError] = useState<string | null>(null);
  const [loadingAnswer, setIsLoading] = useState(false);
  const sesiId = localStorage.getItem("session_id")
  const auth = localStorage.getItem("user_token")

  const submitAnswer = async (data: PostDataProps, handleGetsoal:()=>void) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
          `/user-tests/${sesiId}/submit-answer`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      console.log('Data berhasil dikirim:', response.data.data);
      handleGetsoal()
    } catch (error: any) {
      setError(error.message);
      console.error('Terjadi kesalahan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loadingAnswer,
    error,
    submitAnswer,
  };
};

export default useSubmitAnswer;