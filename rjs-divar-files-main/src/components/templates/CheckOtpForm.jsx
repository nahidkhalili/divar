import { useCheckOtp } from "../../services/user";
import { setCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CheckOtpForm = ({ mobile, setStep, setCode, code }) => {
  const { mutate, isPending } = useCheckOtp();
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    if (isPending) return;
    mutate(
      { mobile, code },
      {
        onSuccess: (response) => {
          setCookie(response.data);
          navigate("/");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
    console.log({ code, mobile });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-[500px] m-auto flex flex-col mt-[100px] border border-solid border-gray-500 rounded-md p-[30px]"
    >
      <p className="text-lg font-normal mb-[20px]">تایید کد اس ام اس شده</p>
      <span className="text-gray-600 text-sm mb-[20px]">
        کد پیامک شده به شماره {mobile} را وارد کنید
      </span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        className="mt-[10px] m-x-0 mb-[20px] p-[5px] border border-solid border-gray-500 rounded-md"
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="w-[110px] py-[5px] px-[10px] border-none bg-[#a62626] text-white rounded-md cursor-pointer"
        type="submit"
      >
        ورود
      </button>
      <button
        className="bg-white text-[#a62626] border border-solid rounded-md border-[#a62626] w-[150px] mt-[30px] py-[5px] px-[10px] cursor-pointer
      "
        onClick={() => setStep(1)}
      >
        تغییر شماره موبایل
      </button>
    </form>
  );
};

export default CheckOtpForm;
