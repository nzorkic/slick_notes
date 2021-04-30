const API_KEY = "AIzaSyA_q33VGHMC9-oMNkrrdvjTo6boyvYSuxo";

const getAllDocuments = async (token: string) => {
  let init = {
    method: "GET",
    async: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    contentType: "application/json",
  };
  var response = await fetch("https://www.googleapis.com/drive/v3/files?fields=files(id,name,mimeType)", init);

  return response.json();
};

const getDocument = async (documentId: string, token: string) => {
  let init = {
    method: "GET",
    async: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    contentType: "application/json",
  };
  var response = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}`,
    init
  );

  return await response.json();
};

const getDocumentLength = async (documentId: string, token: string) => {
  let init = {
    method: "GET",
    async: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    contentType: "application/json",
  };
  var response = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}`,
    init
  );

  var data = await response.json();
  var content = data?.body?.content ?? [];
  return content[content.length - 1]?.endIndex ?? 0;
};

const updateDocument = async (
  content: string,
  documentId: string,
  token: string
) => {
  var index = await getDocumentLength(documentId, token);
  let init = {
    method: "POST",
    async: true,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
    contentType: "application/json",
  };
  var response = await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate?key=${API_KEY}`,
    init
  );

  console.log(response.json());
};

export { getAllDocuments, getDocument, updateDocument, getDocumentLength };
