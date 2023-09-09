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
      console.log("response: ", response);
      if (!response.code === 0) {
        dispatch(logoutSuccess());
      }
    }, 1000);
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
