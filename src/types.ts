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

export type TaskListType = {
  id?: string,
  title: string;
  editMode?: boolean,
  tasks?: TaskType[]
}

export type TaskType = {
  id?:string,
  title:string,
  description?: string,
  editMode?: boolean,
  collapsed?: boolean
}