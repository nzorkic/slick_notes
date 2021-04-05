const API_KEY = "AIzaSyA_q33VGHMC9-oMNkrrdvjTo6boyvYSuxo";

document.addEventListener("mouseup", (event) => {
  var selection = window.getSelection().toString();
  if (event.ctrlKey) {
    chrome.storage.local.get(null, (result) => {
      updateDocument(selection, result["active"], result["token"]);
    });
  }
});

const updateDocument = async (content, documentId, token) => {
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
  await fetch(
    `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate?key=${API_KEY}`,
    init
  );
};

const getDocumentLength = async (documentId, token) => {
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
