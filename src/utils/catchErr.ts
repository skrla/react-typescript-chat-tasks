import { toastErr, toastInfo } from "./toast";

const catchErr = (err: { code?: string }) => {
  
  const { code } = err;
  if (code === "auth/invalid email") toastErr("Invalid email!");

  else if (code === "auth/wrong-password")
    toastErr("That is not the correct password!");

  else if (code === "auth/weak-password") toastErr("Password should be at least 6 characters");

  else if (code === "auth/user-not-found") toastErr("User not found!");

  else if (code === "auth/email-already-exists") toastErr("Email already exists!");

  else if(code === "auth/session-cookie-expired") toastInfo("Logout and login before updating your profile!")

  else if(code === "auth/requires-recent-login") toastErr("Email already exists!"); 

  else if(code === "unavailable") toastErr("Client is offline!")

  else {
    toastErr("Some error")
  }

};

export default catchErr;
