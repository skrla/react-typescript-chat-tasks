import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { BE_signIn, BE_signUp } from "../backend/queries";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSingUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const handleSingUp = () => {
    const data = { email, password, confirmPassword };
    BE_signUp(data, setSingUpLoading, reset);
  };

  const handleSingIn = () => {
    const data = { email, password };
    BE_signIn(data, setSignInLoading, reset);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center text-bold text-4xl md:text-6xl mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="flex flex-col bg-white p-6 min-h-[150px] gap-3 w-full rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!login && (
          <Input
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        {login ? (
          <>
            <Button
              text="Login"
              onClick={handleSingIn}
              loading={signInLoading}
            />
            <Button text="Register" secondary onClick={() => setLogin(false)} />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={handleSingUp}
              loading={signUpLoading}
            />
            <Button text="Login" secondary onClick={() => setLogin(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
