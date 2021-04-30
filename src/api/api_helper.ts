interface ApiCallParameters {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  token: string;
  async?: boolean;
  contentType?: string;
  body?: string;
}

export const createApiInit = ({
  method,
  token,
  async = false,
  contentType = "application/json",
  body,
}: ApiCallParameters) => {
  let init = {
    method: method,
    async: async,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    },
    contentType: contentType,
    body: body,
  };
  return init;
};

export const checkForErrors = (response: Response, text: string) => {
  if (!response.ok) {
    throw new Error(
      `${text} Error ${response.status} - ${response.statusText}`
    );
  }
};
