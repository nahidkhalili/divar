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
    <form onSubmit={submitHandler}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات زیاد باید وارد حساب کاربری خود شوید. لطفا شماره
        موبایل خود را وارد کنی. کد تایید به شماره شما پیامک میشود.
      </span>
      <label htmlFor="input">لطفا شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        placeholder="شماره موبایل"
        id="input"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
};

export default SendOtpForm;
