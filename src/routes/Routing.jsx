import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/Home";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
