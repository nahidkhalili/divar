import { useState } from "react";
import SendOtpForm from "../components/templates/SendOtpForm";
import CheckOtpForm from "../components/templates/CheckOtpForm";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [otpToastId, setOtpToastId] = useState(null);
    const [otp, setOtp] = useState({ code: null, expires: null });

  return (
    <div className="">
      {step === 1 && (
        <SendOtpForm
          mobile={mobile}
          setMobile={setMobile}
          setStep={setStep}
          setOtpToastId={setOtpToastId}
          setOtp={setOtp}
       
        />
      )}
      {step === 2 && (
        <CheckOtpForm
          mobile={mobile}
          setStep={setStep}
          code={code}
          setCode={setCode}
          otpToastId={otpToastId}
             otp={otp}
        />
      )}
    </div>
  );
};

export default AuthPage;
