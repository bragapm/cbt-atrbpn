import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const useLogout= () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = localStorage.getItem("user_token")
  const navigate = useNavigate();

  const postData = async () => {
    setIsLoading(true);
    setError(null);
    const data = {
        coupon_code:localStorage.getItem("couponCode"),
        refresh_token: localStorage.getItem("refresh_token_user")
    }
    try {
      const response = await axios.post(
        import.meta.env.VITE_DIRECTUS_PUBLIC_URL+
        '/coupon/logout',
        data,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            device: localStorage.getItem("deviceInfo")
          },
        }
      );
      console.log('Data berhasil dikirim:', response.data.data);
      localStorage.setItem("dataTest",JSON.stringify(response.data.data))
    } catch (error: any) {
      setError(error?.response?.data?.message);
      console.error('Terjadi kesalahan:', error);
    } finally {
        localStorage.clear();
      setIsLoading(false);
      setTimeout(()=> {     
         navigate("/exam/login");
      },1000)
    }
  };

  return {
    isLoading,
    error,
    postData,
  };
};

export default useLogout;