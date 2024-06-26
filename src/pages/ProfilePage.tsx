import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import avatarGenerator from "../utils/avatarGenerator";
import { toastErr, toastWarn } from "../utils/toast";
import { BE_deleteAccount, BE_saveProfile } from "../backend/userQueries";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setEmail(currentUser.email);
    setUsername(currentUser.username);
    setAvatar(currentUser.img);
  }, [currentUser]);

  const handleAvatarGenerate = () => {
    setAvatar(avatarGenerator());
  };

  const handleSaveProfile = async () => {
    if (!email || !username) toastErr("Email or username can't be empty");

    let temp_pass = password;
    if (temp_pass && temp_pass !== confirmPassword) {
      toastErr("Password must match");
      temp_pass = "";
    }

    let temp_email = email;
    if (temp_email === currentUser.email) temp_email = "";

    let temp_username = username;
    if (temp_username === currentUser.username) temp_username = "";

    let temp_avatar = avatar;
    if (temp_avatar === currentUser.img) temp_avatar = "";

    if (temp_email || temp_pass || temp_username || temp_avatar) {
      await BE_saveProfile(dispatch, setLoading, {
        email: temp_email,
        username: temp_username,
        password: temp_pass,
        img: temp_avatar,
      });
    } else {
      toastWarn("Change details before saving!");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        `Are you sure to delete ${username}? This can't be reversed!`
      )
    ) {
      await BE_deleteAccount(dispatch, setLoading);
    }
  };

  return (
    <div className="bg-customBlack flex flex-col gap-5 shadow-md max-w-2xl rounded-xl py-5 px-6 md:p-10 md:m-auto m-5 md:mt-10">
      <div className="relative self-center" onClick={handleAvatarGenerate}>
        <img
          src={avatar}
          alt="Profile icon"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full p-[2px] ring ring-gray-300 cursor-pointer hover:shadow-lg"
        />
        <span className="absolute top-4 md:top-6 right-0 md:right-3 w-5 h-5 border-2 border-gray-800 rounded-full bg-green-400 z-20"></span>
      </div>

      <p className="text-gray-200 text-sm text-center">
        Note: Click on image to temporary change it, when you like it, then save
        profile. You can leave password and username as they are if you don't
        want to change them
      </p>

      <div className="flex flex-col gap-2 text-white">
        <Input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <Input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          name="confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          text="Update Profile"
          onClick={handleSaveProfile}
          loading={loading}
        />
        <Button
          text="Delete Account"
          secondary
          onClick={handleDeleteAccount}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
