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
}

export default new Client();
