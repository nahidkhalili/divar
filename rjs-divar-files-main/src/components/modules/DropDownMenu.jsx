/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useGetProfile } from "../../services/queries";
import { e2p } from "../../utils/number";
import api from "../../config/api";

const DropDownMenu = ({ className = "", closeMenu }) => {
  const navigate = useNavigate();
  const { data } = useGetProfile();
  const signoutHandler = () => {
   api
      .get("auth/logout")
      .then(() => {
        navigate("/");
        closeMenu();
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };
  console.log(data);
  return (
    <div
      className={`px-4 py-3  bg-white w-[220px] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.15)] text-gray-500 text-[13px] ${className}`}
    >
      <div>
        {data ? (
          <Link to="/dashboard">
            <div
              className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2"
              onClick={closeMenu}
            >
              <img src="/profile.svg" className="w-[15px]" />
              <div className="flex flex-col justify-start gap-1">
                <span>کاربر دیوار</span>
                <span className="text-gray-300">{e2p(data.data.mobile)}</span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex flex-row cursor-pointer py-0 justify-start items-baseline gap-2">
            <img src="/profile.svg" className="w-[15px]" />
            <Link to="/auth">
              <span>ورود</span>
            </Link>
            <hr className="border-gray-300" />
          </div>
        )}

        <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
          <img src="/profile.svg" className="w-[15px]" />
          <span>دیوار حرفه ای</span>
        </div>
        {data && (
          <>
            <hr className="border-gray-300" />

            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
              <img src="/profile.svg" className="w-[15px]" />
              <span>تایید هویت</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
              <img src="/profile.svg" className="w-[15px]" />
              <span>آگهی های من</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
              <img src="/profile.svg" className="w-[15px]" />
              <span>پرداخت های من</span>
            </div>
            <hr className="border-gray-300" />

            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
              <img src="/profile.svg" className="w-[15px]" />
              <span>نشان ها</span>
            </div>
            <hr className="border-t border-gray-300" />

            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
              <img src="/profile.svg" className="w-[15px]" />
              <span>بازدیدهای اخیر</span>
            </div>
            <hr className="border-gray-300" />

            <div
              className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2"
              onClick={signoutHandler}
            >
              <img src="/profile.svg" className="w-[15px]" />
              <span>خروج</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
