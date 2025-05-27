import { HttpClient } from "./http-client";

class Client {
  authors = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/authors`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    getById: (id: string) => HttpClient.get<any>(`/authors/${id}`, {}),
    create: (data: any) => HttpClient.post<any>(`authors`, data),
    update: (data: any) => HttpClient.put<any>(`authors/${data.id}`, data),
    delete: (id: string) => HttpClient.delete<any>(`/authors/${id}`),
  };

  publishers = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/publications`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    getById: (id: string) => HttpClient.get<any>(`/publications/${id}`, {}),
    create: (data: any) => HttpClient.post<any>(`publications`, data),
    update: (data: any) => HttpClient.put<any>(`publications/${data.id}`, data),
    delete: (id: string) => HttpClient.delete<any>(`/publications/${id}`),
  };

  category = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/categories`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    popular: ({ ...params }: any) =>
      HttpClient.get<any>(`/categories/popular`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    getById: (id: string) => HttpClient.get<any>(`/categories/${id}`, {}),
    create: (data: any) => HttpClient.post<any>(`categories`, data),
    update: (data: any) => HttpClient.put<any>(`categories/${data.id}`, data),
    delete: (id: string) => HttpClient.delete<any>(`/categories/${id}`),
  };

  book = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/books`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    popularBook: ({ ...params }: any) =>
      HttpClient.get<any>(`/books/popular`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    newBook: ({ ...params }: any) =>
      HttpClient.get<any>(`/books/new`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    relatedBook: ({ ...params }: any) =>
      HttpClient.get<any>(`/books/related`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    getById: (id: string) => HttpClient.get<any>(`/books/${id}`, {}),
    create: (data: any) => HttpClient.post<any>(`books`, data),
    update: (data: any) => HttpClient.put<any>(`books/${data.id}`, data),
    delete: (id: string) => HttpClient.delete<any>(`/books/${id}`),
  };

  users = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/user`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    me: (id: string) => HttpClient.get<any>(`/user/me`, {}),
    block: (data: any) => HttpClient.put<any>(`user/block/${data.id}`, data),
    unBlock: (data: any) => HttpClient.put<any>(`user/block/${data.id}`, data),
    delete: (id: string) => HttpClient.delete<any>(`/user/${id}`),
  };

  auth = {
    signup: (data: any) => HttpClient.post<any>(`auth/signup`, data),
    login: (data: any) => HttpClient.post<any>(`auth/login`, data),
    verifyOtp: (data: any) => HttpClient.post<any>(`auth/verify-otp`, data),
    forgotPassword: (data: any) =>
      HttpClient.post<any>(`auth/forgot-password`, data),
    resetPassword: (data: any) =>
      HttpClient.post<any>(`auth/reset-password`, data),
    changePassword: (data: any) =>
      HttpClient.put<any>(`auth/change-password`, data),
  };

  reviews = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/reviews`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),
    getById: (id: string) => HttpClient.get<any>(`/reviews/${id}`, {}),
    create: (data: any) => HttpClient.post<any>(`reviews`, data),
    update: (data: any) => HttpClient.put<any>(`reviews/${data.id}`, data),
    delete: (id: string) => HttpClient.delete<any>(`/reviews/${id}`),
  };

  myLibrary = {
    getAll: ({ ...params }: any) =>
      HttpClient.get<any>(`/my-library`, {
        ...params,
        search: HttpClient.formatSearchParams({}),
      }),

    add: (data: any) => HttpClient.post<any>(`/my-library`, data),

    update: (userId: number | string, bookId: number | string, data: any) =>
      HttpClient.put<any>(`/my-library/${userId}/${bookId}`, data),

    remove: (userId: number | string, bookId: number | string) =>
      HttpClient.delete<any>(`/my-library/${userId}/${bookId}`),
  };
}

export default new Client();
