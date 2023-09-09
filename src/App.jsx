import Routing from "./routes/Routing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRefreshToken } from "./hook/useRefreshToken";
import { logoutSuccess } from "./redux/reducers/authReducer";
import { useAuthentication } from "./hook/useAuthentication";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useAuthentication();
  const refreshToken = useRefreshToken();

  const handleBeforeUnload = async () => {
    setTimeout(async () => {
      const response = await refreshToken();
      if (!response.code === 0) {
        dispatch(logoutSuccess());
      }
    }, 500);
  };

  useEffect(() => {
    if (isAuthenticated) handleBeforeUnload();
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
