import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
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
  user_session_id: number;
  pin: number;
}

const usePin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = localStorage.getItem("user_token")
  const navigate = useNavigate();

  const postData = async (data: PostDataProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
        '/user-session-tests/start',
        data,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            device: localStorage.getItem("deviceInfo")
          },
        }
      );
      localStorage.setItem("dataTest",JSON.stringify(response.data.data))
      navigate("/exam");
    } catch (error: any) {
      setError(error?.response?.data?.message);
      console.error('Terjadi kesalahan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    postData,
  };
};

export default usePin;