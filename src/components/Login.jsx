import Header from "./Header";
import { useAuthentication } from "../hook/useAuthentication";
import Home from "../pages/Home";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setMessage } from "../redux/reducers/authReducer";
import { useSetMessage } from "../hook/useSetMessage";
import { useEmailRegister } from "../hook/useEmailRegister";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [er, setEr] = useState("");
  const [messageRegisterSuccess, setMessageRegisterSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuthentication();
  const setMessageRegister = useSetMessage();
  const emailRigister = useEmailRegister();

  const [login, { isLoading }] = useLoginMutation();

  if (isAuthenticated) {
    navigate("/");
  }

  useEffect(() => {
    if (setMessageRegister) {
      dispatch(setMessage(""));
      setMessageRegisterSuccess(setMessageRegister);
      if (emailRigister) {
        setEmail(emailRigister);
      }
      setTimeout(() => {
        setMessageRegisterSuccess("");
      }, 10000);
    }
  }, [setMessageRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(loginSuccess(response));
      navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.data.message);
      setEr(error.data.message);
      setTimeout(() => {
        setEr("");
      }, 5000);
    }
  };

  return isAuthenticated ? (
    <Home />
  ) : (
    <>
      <Header />
      <div className="container flex mx-auto items-center justify-center min-h-screen">
        <div className="w-80 bg-slate-200 shadow-md rounded-lg p-4">
          <h1 className="text-4xl font-bold text-sky-500 mb-4 text-center">
            Đăng Nhập
          </h1>

          {messageRegisterSuccess && (
            <h3 className="mb-4 text-green-500 text-center">
              {messageRegisterSuccess}
            </h3>
          )}

          {er && <h3 className="mb-4 text-red-500 text-center">{er}</h3>}

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

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-40 h-10 p-2 my-2 font-bold text-white bg-blue-500 border rounded-md
                 border-blue-500 transition duration-300 ease-in-out transform
                  ${
                    isLoading
                      ? "cursor-not-allowed"
                      : "hover:scale-105 hover:bg-yellow-500 hover:text-black"
                  }`}
              >
                Đăng Nhập
              </button>
            </div>
            <p className="mt-2 text-gray-600 text-center">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-500">
                Đăng Ký
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
