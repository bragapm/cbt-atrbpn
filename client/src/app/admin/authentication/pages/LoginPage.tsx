import React from "react";
import AuthLogo from "../components/AuthLogo";
import LoginForm from "../components/LoginForm";
import AuthCardLayout from "../layouts/AuthCardLayout";
import { Separator } from "@/components/ui/separator";
import GoogleAuth from "../components/GoogleAuth";

const LoginPage: React.FC = () => {
  return (
    <AuthCardLayout>
      <div className="w-full h-full flex gap-4 flex-col px-20 justify-center">
        <HeaderLogin />
        <LoginForm />
        <Separator />
        <GoogleAuth />
        <p className="text-primary text-center">Lupa Password</p>
        <p className="text-xs font-light text-center">
          Terkendala menggunakan aplikasi? <br /> Untuk bantuan teknis, hubungi
          0812-1234-1234
        </p>
      </div>
    </AuthCardLayout>
  );
};

const HeaderLogin = () => {
  return (
    <div className="w-full flex gap-1 flex-col">
      <div className="w-full flex justify-center">
        <AuthLogo />
      </div>
      <p className="text-center text-sm w-full">Masuk</p>

      <h1 className="text-center text-4xl">
        Dashboard Admin <br /> CBT PPAT
      </h1>
      <p className="text-center text-sm w-full">
        Computer Based Test Petugas Pembuat Akta Tanah
      </p>
    </div>
  );
};

export default LoginPage;
