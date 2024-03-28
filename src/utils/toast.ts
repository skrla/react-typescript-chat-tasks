import { toast } from "react-toastify";

export const toastErr = (msg: string) => {
  toast.error(msg);
};

export const toastSucc = (msg: string) => {
  toast.success(msg);
};

export const toastWarn = (msg: string) => {
  toast.warning(msg);
};

export const toastInfo = (msg: string) => {
  toast.info(msg);
};
