<script>
  import { getAllDocuments } from "../document-service";

  export let userToken = "";

  const signIn = () => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      userToken = token;
    });
  };

  const getDocuments = () => {
    getAllDocuments(userToken);
  };
</script>

<button on:click={signIn}>Login with Google</button>
<button on:click={getDocuments}>Get documents</button>
<p>User token is -> {userToken}</p>
