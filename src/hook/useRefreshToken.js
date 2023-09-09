import { useRefreshAccessTokenMutation } from "../redux/slices/userSlice";
import { useToken } from "./useToken";
import { useDispatch } from "react-redux";
import {
  refreshAccessTokenSuccess,
  logoutSuccess,
} from "../redux/reducers/authReducer";
export function useRefreshToken() {
  const [refresh] = useRefreshAccessTokenMutation();
  const token = useToken();
  const dispatch = useDispatch();

  async function refreshToken() {
    try {
      const response = await refresh(token).unwrap();
      dispatch(refreshAccessTokenSuccess(response));
      return response;
    } catch (error) {
      dispatch(logoutSuccess());
      return error;
    }
  }

  return refreshToken;
}
