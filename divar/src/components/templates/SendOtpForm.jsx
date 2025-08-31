/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSendOtp } from "../../services/user";
import toast from "react-hot-toast";
import Countdown from "react-countdown";

const SendOtpForm = ({ mobile, setMobile, setStep, setOtpToastId }) => {
  const [otp, setOtp] = useState({ code: null, expires: null });

  const { mutate, isPending } = useSendOtp();

  const submitHandler = (e) => {
    e.preventDefault();

    if (isPending) return;
    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          console.log("OTP دریافت شده:", data.otp, data.expiresIn);

          setOtp({ code: data?.otp, expires: data?.expiresIn });
          let expirationTime = Number(data.expiresIn);
          if (expirationTime < Date.now()) {
            const expiresInMs = 2 * 60 * 1000; // 2 min
            expirationTime = Date.now() + expiresInMs;
          }
          console.log(expirationTime, Date.now());
          const toastId = toast.custom(
            (t) => (
              <div className="bg-gradient-to-r from-[#a62626]/90 via-[#a62626]/80 to-[#a62626]/100 text-white border border-[#7a1d1d] rounded-lg p-5 shadow-2xl flex flex-col items-start animate-fade-in relative w-[280px]">
                <div className="flex justify-between w-full items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✅</span>
                    <strong className="font-bold text-base">
                      کد شما: {data?.otp}
                    </strong>
                  </div>
                  <button
                    className="absolute top-2 left-3 text-white font-bold text-xl"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    ×
                  </button>
                </div>
                <div className="text-sm text-white/90 mb-2">
                  لطفا کد را در مدت زمان زیر وارد کنید:
                </div>
                <div className="bg-white text-[#a62626] px-3 py-1 rounded-md font-mono text-center w-full">
                  <Countdown
                    date={expirationTime}
                    renderer={({ minutes, seconds, completed }) => {
                      if (completed) {
                        toast.dismiss(t.id);
                        return <span>Expired</span>;
                      }
                      return (
                        <span>
                          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </span>
                      );
                    }}
                  />
                </div>
                <div className="mt-3 text-xs text-white/70">
                  این کد فقط یکبار استفاده می‌شود.
                </div>
              </div>
            ),
            { duration: Infinity }
          );

          if (setOtpToastId) setOtpToastId(toastId);
          setStep(2);
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
        موبایل خود را وارد کنید. کد تایید به شماره شما پیامک می‌شود.
      </span>
      <label className="text-base font-normal" htmlFor="input">
        لطفا شماره موبایل خود را وارد کنید
      </label>
      <input
        className="mt-[10px] m-x-0 mb-[20px] p-[5px] border border-solid border-gray-500 rounded-md"
        type="text"
        placeholder="شماره موبایل"
        id="input"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      {otp.code && (
        <p className="text-green-600 mt-4">کد تایید شما: {otp.code}</p>
      )}
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
