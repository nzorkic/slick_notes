var userToken = "";

chrome.storage.local.get(
  ["userToken"],
  (result) => (userToken = result["userToken"])
);

const API_KEY = "AIzaSyA_q33VGHMC9-oMNkrrdvjTo6boyvYSuxo";

document.addEventListener("mouseup", (event) => {
  var selection = window.getSelection().toString();

  if (selection && userToken && event.ctrlKey) {
    updateDocument(
      selection,
      "1T1uMQe8CZUYP9vo9B9XQZc-8J7v163kzwu35ciC3Wfk",
      userToken
    );
  }
});

chrome.storage.onChanged.addListener((changes) => {
  for (var key in changes) {
    var storageChange = changes[key];
    updateDocument(
      storageChange.newValue,
      "1T1uMQe8CZUYP9vo9B9XQZc-8J7v163kzwu35ciC3Wfk",
      userToken
    );
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
