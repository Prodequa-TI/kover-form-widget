import { API_ENVS } from "@/features/estimate/config/apiConfig";

interface IHttpClient {
  get<T>(url: string): Promise<KoverResponse<T>>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<KoverResponse<T>>;
}

interface KoverResponse<T> {
  success: boolean;
  data: T
}

class HttpClient implements IHttpClient {
  private baseUrl: string;
  constructor() {
    this.baseUrl = API_ENVS.url.local;
  }

  async get<T>(url: string): Promise<KoverResponse<T>> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      throw new Error('Error al obtener datos');
    }
    return response.json();
  }

  async post<T>(url: string, data?: unknown, config?: RequestInit): Promise<KoverResponse<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
    if (!response.ok) {
      throw new Error('Error al enviar petición');
    }
    return response.json();
  }

  async put<T>(url: string, data?: unknown, config?: RequestInit): Promise<KoverResponse<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
    if (!response.ok) {
      throw new Error('Error al enviar petición');
    }
    return response.json();
  }
}

export const httpClient = new HttpClient();
