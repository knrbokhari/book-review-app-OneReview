"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.category.create,
    onSuccess: () => {
      router.push("/admin/categories");
      toast.success("Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Create failed");
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.category.update,
    onSuccess: () => {
      router.push("/admin/categories");
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Update failed");
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.category.delete,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Delete failed");
    },
  });
};

export const useCategoryQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["categories", id],
    queryFn: () => client.category.getById(id),
  });

  return {
    category: data,
    error,
    loading: isLoading,
  };
};

export const useCategoryListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["categories", options],
    queryFn: ({ queryKey }) => client.category.getAll(queryKey[1]),
    // keepPreviousData: true,
  });

  return {
    categories: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};

export const usePopularCategoryQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["popular-categories", options],
    queryFn: ({ queryKey }) => client.category.popular(queryKey[1]),
  });

  return {
    popularCategories: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};
