import Header from "./Header";
import { useAuthentication } from "../hook/useAuthentication";
import Home from "../pages/Home";
import { useState } from "react";
import { useLoginMutation } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/authReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [er, setEr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuthentication();

  const [login, { isLoading }] = useLoginMutation();

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
            Login
          </h1>

          {er && <h3 className="mb-4 text-red-500 text-center">{er}</h3>}

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-gray-800 mt-2">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 p-2 my-2 bg-white border rounded-md border-gray-300
        focus:border-green-500 focus:outline-none transition duration-300 ease-in-out"
            />

            <label htmlFor="password" className="text-gray-800 mt-2">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
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
                Login
              </button>
            </div>
            <p className="mt-2 text-gray-600 text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
