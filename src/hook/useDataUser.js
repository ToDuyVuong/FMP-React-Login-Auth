import { useSelector } from "react-redux";

export const useDataUser = () => {
  const data = useSelector((state) => state.auth.user);
  return data;
};
