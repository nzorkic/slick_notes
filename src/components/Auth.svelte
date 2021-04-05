<script>
  import {
    getAllDocuments,
    getDocument,
    updateDocument,
  } from "../document-service";

  const signIn = () => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      chrome.storage.local.set({ userToken: token });
    });
  };

  const getDocuments = () => {
    getAllDocuments("");
  };

  const getOne = () => {
    getDocument("1T1uMQe8CZUYP9vo9B9XQZc-8J7v163kzwu35ciC3Wfk", userToken);
  };

  const update = (content) => {
    console.log("token -> ", userToken);
    updateDocument(
      content,
      "1T1uMQe8CZUYP9vo9B9XQZc-8J7v163kzwu35ciC3Wfk",
      userToken
    );
  };
</script>

<button on:click={signIn}>Login with Google</button>
<button on:click={getDocuments}>Get documents</button>
<button on:click={getOne}>Get document</button>
<button on:click={update}>Update</button>
