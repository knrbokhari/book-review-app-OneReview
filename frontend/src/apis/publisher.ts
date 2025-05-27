"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useCreatePublisherMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.publishers.create,
    onSuccess: () => {
      router.push("/admin/publishers");
      toast.success("Publisher created successfully");
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Create failed");
    },
  });
};

export const useUpdatePublisherMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: client.publishers.update,
    onSuccess: () => {
      router.push("/admin/publishers");

      toast.success("Publisher updated successfully");
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Update failed");
    },
  });
};

export const useDeletePublisherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: client.publishers.delete,
    onSuccess: () => {
      toast.success("Publisher deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["publishers"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Delete failed");
    },
  });
};

export const usePublisherQuery = (id: string) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["publishers", id],
    queryFn: () => client.publishers.getById(id),
  });

  return {
    publisher: data,
    error,
    loading: isLoading,
  };
};

export const usePublisherListQuery = (options: Record<string, any> = {}) => {
  const { data, error, isLoading } = useQuery<any, Error>({
    queryKey: ["publishers", options],
    queryFn: ({ queryKey }) => client.publishers.getAll(queryKey[1]),
    // keepPreviousData: true,
  });

  return {
    publishers: data?.data ?? [],
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
