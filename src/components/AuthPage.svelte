<script>
  import { token } from "../shared/store";

  const signIn = async () => {
    chrome.identity.getAuthToken({ interactive: true }, (userToken) => {
      token.set(userToken);
    });
  };
</script>

<button on:click={signIn}>Login with Google</button>
