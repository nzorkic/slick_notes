const getAllDocuments = (token: string) => {
  let init = {
    method: "GET",
    async: true,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    contentType: "application/json",
  };
  fetch("https://www.googleapis.com/drive/v3/files", init)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export { getAllDocuments };
