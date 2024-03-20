import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { studentActions } from "../redux/Student";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("out");
    sessionStorage.removeItem("token");
    dispatch(studentActions.author(""));

    navigate("/login");
  };
  return (
    <div className=" w-[100vw] min-h-[90vh]  bg-slate-700/40 flex justify-center pt-16">
      <div className="w-80 h-52 rounded-2xl bg-white flex flex-col items-start ps-14  ">
        <div className="font-medium text-black mt-7 mb-5">Log Out?</div>
        <div className="text-sm text-black">Are you sure want to log out?</div>
        <div className="flex gap-x-2 mt-8 ">
          <button
            className="text-sm text-black w-20 h-8 p-1 bg-gray-300 rounded-sm "
            onClick={() => navigate("/login")}
          >
            Cancel
          </button>
          <button
            className="text-sm text-white w-20 h-8 p-1 bg-amber-700 rounded-sm"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
