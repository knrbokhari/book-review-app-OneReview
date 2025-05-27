"use client";

import { useMutation } from "@tanstack/react-query";
import client from "./client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// SIGNUP
export const useSignupMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: client.auth.signup,
    onSuccess: (data) => {
      toast.success(data?.message || "Signup Successful");
      // router.push("/verify-otp");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Signup failed");
    },
  });
};

// LOGIN
export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: client.auth.login,
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/"); // adjust as needed
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Login failed");
    },
  });
};
export const fetchMe = () => client.users.me("");

// VERIFY OTP
export const useVerifyOtpMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: client.auth.verifyOtp,
    onSuccess: () => {
      toast.success("OTP verified");
      router.push("/auth/sign-in"); // or wherever you redirect
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Verification failed");
    },
  });
};

// FORGOT PASSWORD
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: client.auth.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset email sent");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Request failed");
    },
  });
};

// RESET PASSWORD
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: client.auth.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Reset failed");
    },
  });
};

// CHANGE PASSWORD
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: client.auth.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Change failed");
    },
  });
};
