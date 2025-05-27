import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Shield } from "lucide-react";
import React from "react";

export default function OtpVerificationForm({
  setFullOtp,
  isPending,
  email,
  handleSubmit,
}: any) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  // Handle input focus
  const inputRefs = Array(6)
    .fill(0)
    .map(() => React.createRef<HTMLInputElement>());

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  // Countdown timer for resend code
  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  // Handle OTP input change
  const handleChange = (e: any, index: number) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Auto-focus next input if current input is filled
    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };

  // Handle backspace to go back to previous input
  const handleKeyDown = (e: any, index: any) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs[index - 1].current
    ) {
      inputRefs[index - 1].current?.focus();
    }
  };

  // Handle form submission
  const handleOtpSubmit = (e: any) => {
    e.preventDefault();

    setFullOtp(otp.join());

    handleSubmit(otp.join(""));
  };

  // Handle code resend
  const handleResend = () => {
    setResendDisabled(true);
    setCountdown(30);
    // Simulate code resend
  };

  return (
    <div className="-shadow-lg mx-auto max-w-md rounded-xl bg-white p-4 sm:p-0 lg:p-6">
      <div className="mb-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-blue-50 p-3">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Verification Code</h2>
        <p className="mt-2 text-gray-500">
          We've sent a 6-digit code to your email
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between gap-4">
          {otp.map((digit, index) => (
            <div key={index} className="relative w-full">
              <input
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`h-16 w-full rounded-lg border-2 bg-gray-50 text-center text-xl font-bold transition-all duration-300 focus:outline-none ${
                  digit
                    ? "border-blue-500 text-blue-500 shadow-sm"
                    : "border-gray-200 text-gray-700"
                } ${verified ? "border-green-500" : ""}`}
              />
              {index < 5 && (
                <div className="absolute -right-[15px] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-semibold text-gray-400 md:block">
                  -
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleOtpSubmit}
        disabled={otp.join("").length !== 6 || loading || verified || isPending}
        className={`flex w-full items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition-all duration-300 ${
          otp.join("").length !== 6 || loading || verified
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        
        Verify Code
        {isPending && (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
        )}
      </button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className={`font-medium transition-colors ${
              resendDisabled
                ? "cursor-not-allowed text-gray-400"
                : "text-blue-500 hover:text-blue-600"
            }`}
          >
            {resendDisabled ? `Resend in ${countdown}s` : "Resend Code"}
          </button>
        </p>
      </div>
    </div>
  );
}
