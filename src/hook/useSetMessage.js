import { useSelector } from "react-redux";

export const useSetMessage = () => {
  const message = useSelector((state) => state.auth.message);
  return message;
};
