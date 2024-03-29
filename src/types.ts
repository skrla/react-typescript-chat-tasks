export type SetLoadingType = React.Dispatch<React.SetStateAction<boolean>>;
export type AuthDataType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type UserType = {
  id: string;
  username: string;
  email: string;
  isOnline: boolean;
  img: string;
  creationTime?: string;
  lastSeen?: string;
  bio?: string;
};
