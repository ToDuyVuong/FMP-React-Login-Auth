import Header from "../components/Header";
import { useAuthentication } from "../hook/useAuthentication";
import { useLogoutMutation } from "../redux/slices/userSlice";
import { useToken } from "../hook/useToken";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess, setMessage } from "../redux/reducers/authReducer";

import { useNavigate } from "react-router-dom";
import { useDataUser } from "./../hook/useDataUser";
import { useCallAPITest } from "../hook/useCallAPITest";
import { useRefreshToken } from "../hook/useRefreshToken";
import { useEffect } from "react";
import { useSetMessage } from "./../hook/useSetMessage";
import Modal from "../components/Modal";

const Home = () => {
  const isAuthenticated = useAuthentication();
  const token = useToken();
  const [messageHome, setMessageHome] = useState("");
  const [logout, { isLoading: isLoandingLogout }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useDataUser();
  const callAPITest = useCallAPITest();
  const refreshAccessToken = useRefreshToken();
  const [isLoading, setIsLoading] = useState(false);
  const loginMessage = useSetMessage();

  const refreshToken = useRefreshToken();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showLoginMessage = (message) => {
    openModal("Đăng Nhập", message);
  };

  const handleBeforeUnload = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await refreshToken();
      if (!response.code === 0) {
        setIsLoading(false);
        dispatch(logoutSuccess());
      }
    }, 1000);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (loginMessage) {
        showLoginMessage(loginMessage);
        dispatch(setMessage(""));   
      } else {
        handleBeforeUnload();
      }
    }
  }, []);

  const handleCallApi = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessageHome("");
    const response = await callAPITest(token);
    // console.log("response: ", response);
    if (response.code === 200) {
      setIsLoading(false);
      setMessageHome(response.message);
    } else {
      const responseRefresh = await refreshAccessToken();
      // console.log("responseRefresh: ", responseRefresh);
      if (responseRefresh.code === 0) {
        const responseCallApi = await callAPITest(responseRefresh.data.token);
        setMessageHome(responseCallApi.message);
        // console.log("responseCallApi: ", responseCallApi, "----", callMessage);
        setIsLoading(false);
      } else {
        dispatch(logoutSuccess());
        navigate("/login");
      }
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

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
        autoCloseTime={5000} // Thời gian tự động đóng sau 5 giây (5000 miligiây)
      />
      <h1 className="text-4xl text-center font-bold m-6">Trang Chủ</h1>
      {isAuthenticated ? (
        <>
          {dataUser && (
            <h2 className="text-2xl text-center">Hello: {dataUser.email}</h2>
          )}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleCallApi}
              disabled={isLoading || isLoandingLogout}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg"
            >
              Gọi API
            </button>
          </div>
          <div className="flex justify-center mt-8">
            {messageHome && (
              <h1 className="mb-4 text-3xl font-bold text-stone-950 text-center">
                {messageHome}
              </h1>
            )}
          </div>

          <div className="fixed  flex justify-center items-center bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
            <button
              onClick={handleLogout}
              disabled={isLoandingLogout || isLoading}
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
