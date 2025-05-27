"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import OtpVerificationForm from "./OtpVerificationForm";
import { useSignupMutation, useVerifyOtpMutation } from "@/apis/auth";

export default function SignupWithPassword() {
  const { mutate: signup, isPending, error } = useSignupMutation();
  const { mutate: otpVerify, isPending: isLoading } = useVerifyOtpMutation();

  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
    re_password: "",
    username: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password } = data;

    // You can remove this code block
    setLoading(true);

    signup(
      { username, email, password },
      {
        onSuccess: (data: any) => {
          if (data?.message) {
            setStep(2);
          }
        },
      },
    );

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOtpVerify = async (otp: string) => {
    await otpVerify({ email: data.email, otp });
  };

  return (
    <>
      {step === 1 ? (
        <form onSubmit={handleSubmit}>
          <InputGroup
            label="Name"
            type="text"
            placeholder="Enter full name"
            className="mb-4 [&_input]:py-[15px]"
            name="username"
            handleChange={handleChange}
            value={data.username}
          />

          <InputGroup
            type="email"
            label="Email"
            className="mb-4 [&_input]:py-[15px]"
            placeholder="Enter your email"
            name="email"
            handleChange={handleChange}
            value={data.email}
            icon={<EmailIcon />}
          />

          <InputGroup
            type="password"
            label="Password"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Enter your password"
            name="password"
            handleChange={handleChange}
            value={data.password}
            icon={<PasswordIcon />}
          />

          <InputGroup
            label="Re-type Password"
            type="password"
            placeholder="Re-type password"
            className="mb-5 [&_input]:py-[15px]"
            name="re_password"
            handleChange={handleChange}
            value={data.re_password}
            icon={<PasswordIcon />}
          />

          <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
            <Checkbox
              label="Remember me"
              name="remember"
              withIcon="check"
              minimal
              radius="md"
              onChange={(e) =>
                setData({
                  ...data,
                  remember: e.target.checked,
                })
              }
            />
          </div>

          <div className="mb-4.5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
            >
              Sign Up
              {loading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
              )}
            </button>
          </div>
        </form>
      ) : (
        <>
          <OtpVerificationForm
            email={data?.email}
            setFullOtp={setOtp}
            isPending={isLoading}
            handleSubmit={handleOtpVerify}
          />
        </>
      )}
    </>
  );
}
