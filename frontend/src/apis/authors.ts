"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreateAuthorMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.authors.create,
    onSuccess: () => {
      router.push("/admin/authors");
      toast.success("Author created successfully");
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Create failed");
    },
  });
};

export const useUpdateAuthorMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.authors.update,
    onSuccess: () => {
      router.push("/admin/authors");

      toast.success("Author updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Update failed");
    },
  });
};

export const useDeleteAuthorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.authors.delete,
    onSuccess: () => {
      toast.success("Author deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Delete failed");
    },
  });
};

export const useAuthorQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["authors", id],
    queryFn: () => client.authors.getById(id),
  });

  return {
    author: data,
    error,
    loading: isLoading,
  };
};

export const useAuthorListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["authors", options],
    queryFn: ({ queryKey }) => client.authors.getAll(queryKey[1]),
    // keepPreviousData: true,
  });

  return {
    authors: data?.data ?? [],
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
