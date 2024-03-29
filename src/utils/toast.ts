import { toast } from "react-toastify";
import { SetLoadingType } from "../types";

export const toastErr = (msg: string, setLoading?: SetLoadingType) => {
  toast.error(msg);
  if (setLoading) setLoading(false);
};

export const toastSucc = (msg: string, setLoading?: SetLoadingType) => {
  toast.success(msg);
  if (setLoading) setLoading(false);
};

export const toastWarn = (msg: string, setLoading?: SetLoadingType) => {
  toast.warning(msg);
  if (setLoading) setLoading(false);
};

export const toastInfo = (msg: string, setLoading?: SetLoadingType) => {
  toast.info(msg);
  if (setLoading) setLoading(false);
};
