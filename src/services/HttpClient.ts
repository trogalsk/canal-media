import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { IApiErrorModel, IErrorModel } from "src/models";

export const HttpRequestFulfilledInterceptor = (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const apiKeyParam = `api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

  config.url = `${config.url}${
    config.url?.includes("?") ? "&" : "?"
  }${apiKeyParam}`;

  return Promise.resolve(config);
};

export const HttpRequestRejectedInterceptor = (error: any): any => {
  return Promise.reject(error);
};

export class HttpClient {
  config: AxiosRequestConfig;

  axiosInstance: AxiosInstance;

  cancelToken: CancelTokenSource;

  constructor() {
    this.config = {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    };

    this.axiosInstance = axios.create(this.config);

    this.axiosInstance.interceptors.request.use(
      HttpRequestFulfilledInterceptor,
      HttpRequestRejectedInterceptor
    );

    this.cancelToken = axios.CancelToken.source();
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const cfg = this.mergeConfig(config);

    return this.axiosInstance
      .get<T>(url, cfg)
      .then((response: AxiosResponse<T>) => {
        return response.data;
      })
      .catch((error: AxiosError<T>) => {
        return Promise.reject(this.getError(error));
      });
  }

  public async cancel() {
    return this.cancelToken?.cancel();
  }

  private mergeConfig(config: AxiosRequestConfig = {}) {
    return {
      ...config,
      cancelToken: this.cancelToken.token,
      headers: {
        ...config.headers,
      },
    };
  }

  private getError(
    axiosError: AxiosError<IApiErrorModel>
  ): IErrorModel {
    const error: IErrorModel = {
      message: axiosError.message,
    };

    if (axiosError.response) {
      error.status = axiosError.response.status;

      if (axiosError.response.data) {
        error.code = axiosError.response.data.status_code;
        error.message = axiosError.response.data.status_message;
      } else {
        switch (axiosError.response.status) {
          case 401:
            if (!error.message) {
              error.message = `Unauthorized access.`;
            }
            break;
          case 403:
            if (!error.message) {
              error.message = `You don't have permissions to access.`;
            }
            break;
        }
      }
    }

    return error;
  }
}
