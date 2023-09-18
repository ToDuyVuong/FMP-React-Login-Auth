import Header from "./Header";
import { useAuthentication } from "../hook/useAuthentication";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/reducers/authReducer";
import Modal from "./Modal";

const Register = () => {
  const isAuthenticated = useAuthentication();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirm, setComfirm] = useState("");
  const [er, setEr] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });

  if (isAuthenticated) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ email, fullName, password }).unwrap();
      console.log(response);

      dispatch(
        setMessage({
          message: "Đăng ký người dùng mới thành công.",
          email: response.data.email,
        })
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.status === "FETCH_ERROR") {
        showErrorMessage("Máy chủ quá tải.");
      } else {
        showErrorMessage(error.data.message);
      }
    }
  };

  useEffect(() => {
    setIsConfirm(password === confirm);
    if (isConfirm) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirm, isConfirm]);

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showErrorMessage = (message) => {
    setEr(message);
    setTimeout(() => {
      setEr("");
    }, 5000);
    openModal("Lỗi Đăng Ký", message);
  };

  return isAuthenticated ? (
    <>
      <p className="mt-2 text-gray-600 text-center">
        Bạn đã đăng nhập!{" "}
        <Link to="/register" className="text-blue-500">
          Quay lại trang chủ.
        </Link>
      </p>
    </>
  ) : (
    <>
      <Header />

      <div className="container flex mx-auto items-center justify-center min-h-screen">
        <div className="w-80 bg-slate-200 shadow-md rounded-lg p-4">
          <h1 className="text-4xl font-bold text-sky-500 mb-4 text-center">
            Đăng Ký
          </h1>

          {er && <h3 className="mb-4 text-center text-red-500">{er}</h3>}

          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title={modalContent.title}
            content={modalContent.content}
            autoCloseTime={5000} // Thời gian tự động đóng sau 5 giây (5000 miligiây)
          />

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-800 mt-2">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 p-2 my-2 bg-white border rounded-md border-gray-300
        focus:border-green-500 focus:outline-none transition duration-300 ease-in-out"
            />

            <label htmlFor="fullName" className="text-gray-800 mt-2">
              Họ và Tên:
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Nhập họ và tên"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 p-2 my-2 bg-white border rounded-md border-gray-300
        focus:border-green-500 focus:outline-none transition duration-300 ease-in-out"
            />

            <label htmlFor="password" className="text-gray-800 mt-2">
              Mật Khẩu:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 p-2 my-2 bg-white border rounded-md border-gray-300
        focus:border-green-500 focus:outline-none transition duration-300 ease-in-out"
            />

            <label
              htmlFor="confirm-password"
              className={`text-gray-800 mt-2
               ${!passwordsMatch ? "text-red-500" : ""}`}
            >
              Xác nhận mật khẩu: {passwordsMatch ? "" : "Chưa đúng"}
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Nhập xác nhận mật khẩu"
              required
              value={confirm}
              onChange={(e) => setComfirm(e.target.value)}
              className="w-full h-10 p-2 my-2 bg-white border rounded-md border-gray-300
        focus:border-green-500 focus:outline-none transition duration-300 ease-in-out"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isConfirm || isLoading}
                className={`w-40 h-10 p-2 my-2 font-bold text-white bg-blue-500 border rounded-md
                 border-blue-500 transition duration-300 ease-in-out transform
                  ${
                    !isConfirm || isLoading
                      ? "cursor-not-allowed"
                      : "hover:scale-105 hover:bg-yellow-500 hover:text-black"
                  }`}
              >
                Đăng Ký
              </button>
            </div>
            <p className="mt-2 text-gray-600 text-center">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-blue-500 ">
                Đăng Nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
