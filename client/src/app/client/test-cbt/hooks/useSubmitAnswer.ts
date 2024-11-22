import { useState } from 'react';
import axios from 'axios';
import useLogout from './useLogout';

interface PostDataProps {
  problem_id: number;
  answer_id: string;
}

const useSubmitAnswer = () => {
  const [error, setError] = useState<string | null>(null);
  const [loadingAnswer, setIsLoading] = useState(false);
  const sesiId = localStorage.getItem("session_id")
  const auth = localStorage.getItem("user_token")
  const {isLoading:load,error:err,postData} = useLogout()

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
            device: localStorage.getItem("deviceInfo")
          },
        }
      );
      handleGetsoal()
    } catch (error: any) {
      setError(error.message);
      if(error.status == 403){
        if( error?.response?.data?.message === "Invalid device. Login from another device is not allowed.") {
          alert(error?.response?.data?.message)
          postData()
        }
      }
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