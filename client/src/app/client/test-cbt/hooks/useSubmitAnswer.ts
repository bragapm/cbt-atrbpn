import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";


export const formPinUser = z.object({
  user_session_id: z.string(),
  pin: z.string().min(1, "PIN Wajib Diisi")
});

export type IPINRequest = z.infer<typeof formPinUser>;
export type IPINAuthUser = {
onSuccess?: () => void;
onError?: (error: string) => void;
};


interface PostDataProps {
  problem_id: number;
  answer_id: string;
}

const useSubmitAnswer = () => {
  const [error, setError] = useState<string | null>(null);
  const [loadingAnswer, setIsLoading] = useState(false);
  const auth = localStorage.getItem("user_token")
  const sesiId = localStorage.getItem("session_id")

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