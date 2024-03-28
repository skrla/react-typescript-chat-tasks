export type SetLoadingType = React.Dispatch<React.SetStateAction<boolean>>;
export type AuthDataType = {
  email: string;
  password: string;
  confirmPassword?: string;
};