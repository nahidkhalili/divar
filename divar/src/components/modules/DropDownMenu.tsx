/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetProfile } from "../../services/queries";
import { e2p } from "../../utils/number";

type DropDownProps = {
  className?: string;
  closeMenu?: () => void;
};

const DropDownMenu = ({ className = "", closeMenu }: DropDownProps) => {
  const { data, isLoading, isError } = useGetProfile();
  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>خطا در بارگذاری پروفایل</div>;
  console.log("isloading:", isLoading, "data:", data);
  return (
    <div
      className={`px-4 py-3  bg-white w-[220px] rounded-[5px] shadow-[0_0_10px_rgba(0,0,0,0.15)] text-gray-500 text-[13px] ${className}`}
    >
      <div>
        {data ? (
          <Link to="/dashboard" onClick={closeMenu}>
            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
              <img src="/profile.svg" className="w-[15px]" />
              <div className="flex flex-col justify-start gap-1">
                <span>کاربر دیوار</span>
                <span className="text-gray-300">
                  {data?.mobile && e2p(data.mobile)}
                </span>
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

            <div className="flex flex-row cursor-pointer py-3 justify-start items-baseline gap-2">
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
