import { apiRequest } from "./queryClient";

export async function fetchProxiedContent(url: string): Promise<Response> {
  return await apiRequest("GET", `/api/proxy?url=${encodeURIComponent(url)}`, undefined);
}
