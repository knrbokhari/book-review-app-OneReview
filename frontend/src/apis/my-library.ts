"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import client from "./client";

// ADD BOOK TO MY LIBRARY
export const useAddToLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client?.myLibrary.add,
    onSuccess: () => {
      toast.success("Book added to your library");
      queryClient.invalidateQueries({ queryKey: ["myLibrary"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Add failed");
    },
  });
};

// UPDATE LIBRARY ENTRY (status, progress, rating, review)
export const useUpdateLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, bookId, ...data }: any) =>
      client?.myLibrary.update(userId, bookId, data),
    onSuccess: () => {
      toast.success("Library updated successfully");
      queryClient.invalidateQueries({ queryKey: ["myLibrary"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Update failed");
    },
  });
};

// REMOVE BOOK FROM LIBRARY
export const useRemoveFromLibraryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, bookId }: { userId: number; bookId: number }) =>
      client?.myLibrary.remove(userId, bookId),
    onSuccess: () => {
      toast.success("Book removed from your library");
      queryClient.invalidateQueries({ queryKey: ["myLibrary"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Remove failed");
    },
  });
};

// GET LIBRARY LIST
export const useLibraryListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["myLibrary", options],
    queryFn: ({ queryKey }) => client?.myLibrary.getAll(queryKey[1]),
  });

  return {
    library: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};
