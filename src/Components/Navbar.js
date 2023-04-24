import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-richblack-900 flex justify-between items-center w-[100vw] py-4 mx-auto fixed z-1 px-[10vw]">
      <nav>
        <ul className="text-richblack-100 flex gap-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/playlist">PlayList</Link>
          </li>
        </ul>
      </nav>
      <div>
        {!localStorage.getItem("token") ? (
          <div className="flex items-center gap-x-4">
            <Link to="/login" role="button">
              <button
                className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
              >
                Log in
              </button>
            </Link>
            <Link to="/signup" role="button">
              <button
                className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700"
              >
                SignUp
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => {
                toast.success("Logged Out");
                handleLogout();
              }}
              className="bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700 mx-2"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
