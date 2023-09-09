import { useSelector } from "react-redux";

export const useAuthentication = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated;
};
