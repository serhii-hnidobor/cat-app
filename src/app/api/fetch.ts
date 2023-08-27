interface Header {
  headerName: string;
  headerValue: string;
}

type Interceptor = () => Header;

type HTTPRequest = "POST" | "GET" | "DELETE";

function getContentType(data: Record<string, unknown> | FormData | undefined) {
  if (!data || data instanceof FormData) {
    return undefined;
  }

  return "application/json";
}

class Fetch {
  #interceptors: Interceptor[];
  #baseUrl: string;
  constructor(baseUrl: string, interceptors: Interceptor[]) {
    this.#interceptors = interceptors;
    this.#baseUrl = baseUrl;
  }

  getHeaders(
    headers?: Record<string, string>[] | Record<string, string> | undefined
  ) {
    const resHeader = new Headers();
    this.#interceptors.forEach((interceptor) => {
      const { headerName, headerValue } = interceptor();
      resHeader.append(headerName, headerValue);
    });

    if (!headers) {
      return resHeader;
    }

    if (!Array.isArray(headers)) {
      resHeader.append(headers.headerName, headers.headerValue);
      return resHeader;
    }

    headers.forEach((header) => {
      resHeader.append(header.headerName, header.headerValue);
    });

    return resHeader;
  }

  private getRequestData(data?: FormData | Record<string, unknown>) {
    if (!data) {
      return null;
    }

    if (data instanceof FormData) {
      return data;
    }

    return JSON.stringify(data);
  }

  async request<T>(
    url: string,
    requestType: HTTPRequest,
    data?: Record<string, unknown> | FormData
  ) {
    const response = await fetch(`${this.#baseUrl}${url}`, {
      method: requestType,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: this.getHeaders(
        getContentType(data)
          ? {
              headerName: "Content-Type",
              headerValue: getContentType(data) as string,
            }
          : undefined
      ),
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: this.getRequestData(data),
    });

    try {
      return await this.checkStatus(response);
    } catch (error) {
      this.throwError(error);
    }
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }
  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response
        .json()
        .then((parsed) => {
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed[0];
          }
          return parsed;
        })
        .catch(() => ({
          message: response.statusText,
        }));

      throw {
        status: response.status,
        message: parsedException?.message,
        errorCode: parsedException?.errorCode,
      };
    }

    return response;
  }
  private throwError(err: unknown): never {
    throw err;
  }
}

export { Fetch, type HTTPRequest };
