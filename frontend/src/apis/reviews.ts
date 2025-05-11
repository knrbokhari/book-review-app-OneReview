"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./client";
import { toast } from "react-toastify";

// CREATE REVIEW
export const useCreateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.reviews.create,
    onSuccess: () => {
      toast.success("Review submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Submit failed");
    },
  });
};

// UPDATE REVIEW
export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.reviews.update,
    onSuccess: () => {
      toast.success("Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Update failed");
    },
  });
};

// DELETE REVIEW
export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.reviews.delete,
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Delete failed");
    },
  });
};

// GET SINGLE REVIEW
export const useReviewQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["reviews", id],
    queryFn: () => client.reviews.getById(id),
  });

  return {
    review: data,
    error,
    loading: isLoading,
  };
};

// GET REVIEW LIST
export const useReviewListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["reviews", options],
    queryFn: ({ queryKey }) => client.reviews.getAll(queryKey[1]),
  });

  return {
    reviews: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};
