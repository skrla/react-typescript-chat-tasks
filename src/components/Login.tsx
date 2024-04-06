import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { BE_signIn, BE_signUp, getStorageUser } from "../backend/userQueries";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { AuthDataType } from "../types";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpLoading, setSingUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = getStorageUser();

  const auth = (
    data: AuthDataType,
    func: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    func(data, setLoading, reset, navigate, dispatch);
  };

  const handleSingUp = () => {
    const data = { email, password, confirmPassword };
    auth(data, BE_signUp, setSingUpLoading);
  };

  const handleSingIn = () => {
    const data = { email, password };
    auth(data, BE_signIn, setSignInLoading);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(setUser(user));
      navigate("/dashboard");
    }
  }, [dispatch, navigate, user]);

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
