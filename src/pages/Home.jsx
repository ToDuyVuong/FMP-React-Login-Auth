import Header from "../components/Header";
import { useAuthentication } from "../hook/useAuthentication";
import { useLogoutMutation } from "../redux/slices/userSlice";
import { useToken } from "../hook/useToken";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useDataUser } from "./../hook/useDataUser";
import { useCallAPITest } from "../hook/useCallAPITest";
import { useRefreshToken } from "../hook/useRefreshToken";

const Home = () => {
  const isAuthenticated = useAuthentication();
  const token = useToken();
  const [message, setMessage] = useState("");
  const [logout, { isLoading: isLoandingLogout }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useDataUser();
  const callAPITest = useCallAPITest();
  const refreshAccessToken = useRefreshToken();
  const [isLoading, setIsLoading] = useState(false);

  const handleCallApi = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    const response = await callAPITest(token);
    // console.log("response: ", response);
    if (response.code === 200) {
      setIsLoading(false);
      setMessage(response.message);
    } else {
      const responseRefresh = await refreshAccessToken();
      // console.log("responseRefresh: ", responseRefresh);
      if (responseRefresh.code === 0) {
        setTimeout(async () => {
          const responseCallApi = await callAPITest(responseRefresh.data.token);
          setMessage(responseCallApi.message);
          // console.log("responseCallApi: ", responseCallApi);
          setIsLoading(false);
        }, 800);
      } else {
        dispatch(logoutSuccess());
      }
      navigate("/login");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await logout(token).unwrap();
      // console.log("logout: ", response);
      dispatch(logoutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(logoutSuccess());
      // console.log("logout: ", error);
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-4xl text-center font-bold m-6">Trang Chủ</h1>
      {isAuthenticated ? (
        <>
          {dataUser && (
            <h2 className="text-2xl text-center">Hello: {dataUser.email}</h2>
          )}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleCallApi}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Gọi API
            </button>
          </div>
          <div className="flex justify-center mt-8">
            {message && (
              <h1 className="mb-4 text-3xl font-bold text-stone-950 text-center">
                {message}
              </h1>
            )}
          </div>

          <div className="fixed  flex justify-center items-center bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
            <button
              onClick={handleLogout}
              disabled={isLoandingLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Đăng Xuất
            </button>
          </div>
        </>
      ) : (
        <div className="fixed text-center bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
          <p>Bạn chưa được xác thực. Vui lòng đăng nhập hoặc đăng ký.</p>
        </div>
      )}
    </>
  );
};

export default Home;
