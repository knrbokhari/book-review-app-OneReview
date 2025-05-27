"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// ALL USERS
export const useUserListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["users", options],
    queryFn: ({ queryKey }) => client.users.getAll(queryKey[1]),
  });

  return {
    users: data?.data ?? [],
    paginatorInfo: {
      total: data?.total,
      limit: data?.limit,
      pages: Math.ceil(data?.total / data?.limit),
      currentPage: data?.page || 1,
      perPage: data?.limit || 10,
    },
    error,
    loading: isLoading,
  };
};

// ME (current user info)
export const useMeQuery = () => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["me"],
    queryFn: () => client.users.me(""),
  });

  return {
    me: data,
    error,
    loading: isLoading,
  };
};

// BLOCK USER
export const useBlockUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.users.block,
    onSuccess: () => {
      toast.success("User blocked successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Block failed");
    },
  });
};

// UNBLOCK USER
export const useUnblockUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.users.unBlock,
    onSuccess: () => {
      toast.success("User unblocked successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Unblock failed");
    },
  });
};

// DELETE USER
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.users.delete,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Delete failed");
    },
  });
};
