import { useSelector } from "react-redux";

export const useEmailRegister = () => {
  const emailRegister = useSelector((state) => state.auth.email);
  return emailRegister;
};
