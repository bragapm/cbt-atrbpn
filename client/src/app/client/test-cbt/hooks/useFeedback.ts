import { useState } from 'react';
import axios from 'axios';
import useLogout from './useLogout';

interface PostDataProps {
  feedback: string;
  user_session_id:number
}

const useFeedback = () => {
  const [error, setError] = useState<string | null>(null);
  const [data,setData] = useState(false)
  const [loadingFeedback, setIsLoading] = useState(false);
  const auth = localStorage.getItem("user_token")

  const {isLoading,error:err,postData} = useLogout()

  const sendFeedback = async (data: PostDataProps) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
          `/user-session-tests/feedback`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            device: localStorage.getItem("deviceInfo")
          },
        }
      );
    } catch (error: any) {
      setError(error.message);
      if(error.status == 403){
        if( error?.response?.data?.message === "Device tidak valid. Login dari device tidak diperbolehkan.") {
          alert(error?.response?.data?.message)
          postData()
        }
      }
    } finally {
        setData(true)
      setIsLoading(false);
    }
  };

  return {
    data,
    loadingFeedback,
    error,
    sendFeedback,
  };
};

export default useFeedback;