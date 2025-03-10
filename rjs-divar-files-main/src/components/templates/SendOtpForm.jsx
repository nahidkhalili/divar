/* eslint-disable react/prop-types */
import { useSendOtp } from "../../services/mutations";

const SendOtpForm = ({ mobile, setMobile, setStep }) => {
  const { mutate, isPending } = useSendOtp();

  const submitHandler = (e) => {
    e.preventDefault();
    if (isPending) return;
    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          console.log("change step", data);
          setStep(2);
        },
        onError: (error) => {
          console.log("hhhhiii", error);
        },
      }
    );
  };
  return (
    <form
      onSubmit={submitHandler}
      className="max-w-[500px] m-auto flex flex-col mt-[100px] border border-solid border-gray-500 rounded-md p-[30px]"
    >
      <p className="text-lg font-normal mb-[20px]">ورود به حساب کاربری</p>
      <span className="text-gray-600 text-sm mb-[20px]">
        برای استفاده از امکانات دیوار باید وارد حساب کاربری خود شوید. لطفا شماره
        موبایل خود را وارد کنی. کد تایید به شماره شما پیامک میشود.
      </span>
      <label className="text-base font-normal" htmlFor="input">لطفا شماره موبایل خود را وارد کنید</label>
      <input
        className="mt-[10px] m-x-0 mb-[20px] p-[5px] border border-solid border-gray-500 rounded-md"
        type="text"
        placeholder="شماره موبایل"
        id="input"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button
        type="submit"
        className="w-[110px] py-[5px] px-[10px] border-none bg-[#a62626] text-white rounded-md cursor-pointer"
      >
        ارسال کد تایید
      </button>
    </form>
  );
};

export default SendOtpForm;
