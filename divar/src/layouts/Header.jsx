import { Link } from "react-router-dom";
import DropDownMenu from "../components/modules/DropDownMenu";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [activeHeader, setActiveHeader] = useState(false);
  const dropdownRef = useRef(null);

  const closeMenu = () => {
    setActiveHeader(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (activeHeader) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeHeader]);

  return (
    <header className="flex flex-row justify-between items-center border-b-2 border-solid border-[rgb(234,234,234)] py-[10px] px-0 mb-[20px]">
      <div className="flex flex-row gap-8">
        <Link to="/">
          <img className="w-[45px] ml-[40px]" src="/divar.svg" />
        </Link>
        <span className="flex flex-row items-center text-gray-400 h-[50px]">
          <img className="w-[20px]" src="/location.svg" />
          <p className="text-[0.9rem] mr-2">تهران</p>
        </span>
      </div>
      <div className="flex flex-row items-center gap-8">
        <div className="relative" ref={dropdownRef}>
          <div
            className=" flex flex-row items-center cursor-pointer w-[140px] px-6 text-gray-500 h-[50px] rounded-[3px] hover:bg-gray-200 active:bg-gray-200"
            onClick={() => setActiveHeader(!activeHeader)}
          >
            <img className="w-[14px]" src="/profile.svg" />
            <p className="text-[0.8rem] mr-2">دیوار من</p>
          </div>
          {activeHeader && (
            <DropDownMenu className="absolute top-12" closeMenu={closeMenu} />
          )}
        </div>

        <Link to="/support">
          <div className=" flex flex-row cursor-pointer items-center  w-[140px] px-6 text-gray-500 h-[50px] rounded-[3px] hover:bg-gray-200  active:bg-gray-200">
            <img className="w-[18px]" src="/message-bubble.png" />
            <p className="text-[0.8rem] mr-2"> چت و تماس</p>
          </div>
        </Link>
        <Link>
          <div className=" flex flex-row cursor-pointer w-[140px] items-center px-6 text-gray-500 h-[50px] rounded-[3px] hover:bg-gray-200  active:bg-gray-200">
            <img className="w-[18px]" src="/buoy.png" />
            <p className="text-[0.8rem] mr-2"> پشتیبانی</p>
          </div>
        </Link>
        <Link
          className="bg-[var(--red-color)] text-white h-[40px] w-[80px] leading-[40px] text-center rounded-md mr-[40px]"
          to="/dashboard"
        >
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
};

export default Header;
