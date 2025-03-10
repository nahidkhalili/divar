import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center border-b-2 border-solid border-[rgb(234,234,234)] py-[10px] px-0 mb-[20px]">
      <div className="flex flex-row gap-8">
        <Link to="/">
          <img className="w-[45px] ml-[40px]" src="divar.svg" />
        </Link>
        <span className="flex flex-row items-center text-gray-400 h-[50px]">
          <img className="w-[20px]" src="location.svg" />
          <p className="text-[0.9rem] mr-2">تهران</p>
        </span>
      </div>
      <div className="flex flex-row items-center gap-8">
        <Link to="/auth">
          <span className="flex flex-row items-center text-gray-400 h-[50px]">
            <img className="w-[20px]" src="profile.svg" />
            <p className="text-[0.9rem] mr-2">دیوار من</p>
          </span>
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
