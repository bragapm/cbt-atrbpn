import { useState } from 'react';
import axios from 'axios';
import useLogout from './useLogout';
import { useNavigate } from 'react-router-dom';

interface PostDataProps {
  // feedback: string;
  user_session_id:number
}

const useFinish = () => {
  const [error, setError] = useState<string | null>(null);
  const [data,setData] = useState(null)
  const [loadingFinish, setIsLoading] = useState(false);
  const auth = localStorage.getItem("user_token")
  const {isLoading:load,error:err,postData} = useLogout()
  const navigate = useNavigate();

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
      localStorage.setItem("finishData",JSON.stringify(response.data.data))
      setData(response.data.data)
      navigate("/exam/finish");
    } catch (error: any) {
      setError(error.message);
      if(error.status == 403){
        if( error?.response?.data?.message === "Device tidak valid. Login dari device tidak diperbolehkan.") {
          alert(error?.response?.data?.message)
          postData()
        }
      }
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