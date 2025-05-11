"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// CREATE
export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.book.create,
    onSuccess: () => {
      router.push("/admin/books");
      toast.success("Book created successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Create failed");
    },
  });
};

// UPDATE
export const useUpdateBookMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.book.update,
    onSuccess: () => {
      router.push("/admin/books");
      toast.success("Book updated successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Update failed");
    },
  });
};

// DELETE
export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.book.delete,
    onSuccess: () => {
      toast.success("Book deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Delete failed");
    },
  });
};

// SINGLE BOOK
export const useBookQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["books", id],
    queryFn: () => client.book.getById(id),
  });

  return {
    book: data,
    error,
    loading: isLoading,
  };
};

// ALL BOOKS
export const useBookListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["books", options],
    queryFn: ({ queryKey }) => client.book.getAll(queryKey[1]),
  });

  return {
    books: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};

// POPULAR BOOKS
export const usePopularBooksQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["books-popular", options],
    queryFn: ({ queryKey }) => client.book.popularBook(queryKey[1]),
  });

  return {
    popularBooks: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};

// NEW BOOKS
export const useNewBooksQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["books-new", options],
    queryFn: ({ queryKey }) => client.book.newBook(queryKey[1]),
  });

  return {
    newBooks: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};

// RELATED BOOKS
export const useRelatedBooksQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["books-related", options],
    queryFn: ({ queryKey }) => client.book.relatedBook(queryKey[1]),
  });

  return {
    relatedBooks: data?.data ?? [],
    paginatorInfo: data?.page,
    error,
    loading: isLoading,
  };
};
