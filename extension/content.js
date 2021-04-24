const API_KEY = "AIzaSyA_q33VGHMC9-oMNkrrdvjTo6boyvYSuxo";

document.addEventListener("mouseup", (event) => {
<<<<<<< HEAD
  var selection = window.getSelection().toString();
  if (event.ctrlKey) {
    chrome.storage.local.get(null, (result) => {
      updateDocument(selection, result["active"], result["token"]);
    });
  }
});

=======
  var selection = window.getSelection().toString().trim();

  if (!selection.length) return;

  if (event.ctrlKey && event.altKey) {
    writeContent(`\n\n${selection}`);
  } else if (event.ctrlKey) {
    writeContent(` ${selection}`);
  } else if (event.altKey) {
    writeContent(`\n${selection}`);
  }
});

const writeContent = (content) => {
  chrome.storage.local.get(null, (result) => {
    updateDocument(content, result["active"], result["token"]);
  });
};

>>>>>>> 0deac32 (test)
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
<<<<<<< HEAD
            text: `\n${content}`,
=======
            text: `${content}`,
>>>>>>> 0deac32 (test)
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
