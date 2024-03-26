import React from "react";
import Input from "./Input";

const Login = () => {
  return (
      <div className="w-full md:w-[450px]">
        <h1 className="text-white text-center text-bold text-4xl md:text-6xl mb-10">
          Login
        </h1>
        <div className="flex flex-col bg-white p-6 min-h-[150px] gap-3 w-full rounded-xl drop-shadow-xl">
          <Input name="email" type="email" />
          <Input name="password" type="password" />
          <Input name="confirm-password" type="password" />
        </div>
      </div>

  );
}

export default Login;