import Header from "./Header";
import { useAuthentication } from "../hook/useAuthentication";
import Home from "../pages/Home";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

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

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ email, fullName, password }).unwrap();
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setEr(error.data.message);
      setTimeout(() => {
        setEr("");
      }, 5000);
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

  return isAuthenticated ? (
    <Home />
  ) : (
    <>
      <Header />
      <div className="container flex mx-auto items-center justify-center min-h-screen">
        <div className="w-80 bg-slate-200 shadow-md rounded-lg p-4">
          <h1 className="text-4xl font-bold text-sky-500 mb-4 text-center">
            Register
          </h1>

          {er && <h3 className="mb-4 text-center text-red-500">{er}</h3>}

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

            <label htmlFor="fullName" className="text-gray-800 mt-2">
              Full Name:
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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

            <label
              htmlFor="confirm-password"
              className={`text-gray-800 mt-2
               ${!passwordsMatch ? "text-red-500" : ""}`}
            >
              Confirm Password: {passwordsMatch ? "" : "Passwords do not match"}
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              required
              value={confirm}
              onChange={(e) => setComfirm(e.target.value)}
              className="w-full h-10 p-2 my-2 bg-white border rounded-md border-gray-300
        focus:border-green-500 focus:outline-none transition duration-300 ease-in-out"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isConfirm}
                className={`w-40 h-10 p-2 my-2 font-bold text-white bg-blue-500 border rounded-md
                 border-blue-500 transition duration-300 ease-in-out transform
                  ${
                    !isConfirm || isLoading
                      ? "cursor-not-allowed"
                      : "hover:scale-105 hover:bg-yellow-500 hover:text-black"
                  }`}
              >
                Register
              </button>
            </div>
            <p className="mt-2 text-gray-600 text-center">
              Do you already have an account?{" "}
              <Link to="/login" className="text-blue-500 ">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;