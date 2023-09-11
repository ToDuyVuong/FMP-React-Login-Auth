import { Link } from "react-router-dom";
import { useAuthentication } from "../hook/useAuthentication";

const Header = () => {
  const isAuthenticated = useAuthentication();

  return (
    <nav className="bg-emerald-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black font-semibold text-lg">
          Trang Chủ
        </Link>
        {!isAuthenticated && (
          <ul className="flex space-x-4">
            <>
              <li>
                <Link
                  to="/login"
                  className="text-black font-bold hover:text-red-500  transition-colors duration-200 "
                >
                  Đăng Nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-black font-bold hover:text-red-500  transition-colors duration-200 "
                >
                  Đăng Ký
                </Link>
              </li>
            </>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
