import { checkForErrors, createApiInit } from "./api_helper";

const getRootDrive = async (token: string) => {
  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files/root",
    createApiInit({ method: "GET", async: true, token: token })
  );

  checkForErrors(response, "There was an error fetching the root document.");

  return response.json();
};

const getAllDocuments = async (token: string) => {
  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files?fields=files(id,name,mimeType)",
    createApiInit({ method: "GET", async: true, token: token })
  );

  checkForErrors(response, "There was an error fetching all documents.");

  return response.json();
};

const getDocument = async (documentId: string, token: string) => {
  const response = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}`,
    createApiInit({ method: "GET", async: true, token: token })
  );

  checkForErrors(response, "There was an error fetching a document.");

  return await response.json();
};

const getDocumentLength = async (
  documentId: string,
  token: string
): Promise<number> => {
  const response = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}`,
    createApiInit({ method: "GET", async: true, token: token })
  );

  checkForErrors(response, "There was an error fetching document length.");

  const data = await response.json();
  const content = data?.body?.content ?? [];
  return content[content.length - 1]?.endIndex ?? 0;
};

const updateDocument = async (
  content: string,
  documentId: string,
  token: string
) => {
  const index = await getDocumentLength(documentId, token);
  const body = JSON.stringify({
    requests: [
      {
        insertText: {
          location: {
            index: index - 1,
          },
          text: `\n${content}`,
        },
      },
    ],
  });
  const response = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate?key=${process.env.API_KEY}`,
    createApiInit({ method: "POST", async: true, token: token, body: body })
  );

  checkForErrors(response, "There was an error updating the document.");
};

export {
  getAllDocuments,
  getDocument,
  updateDocument,
  getDocumentLength,
  getRootDrive,
};