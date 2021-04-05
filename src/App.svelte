<script>
  import { token } from "./shared/store";

  import AuthPage from "./components/AuthPage.svelte";
  import DocumentsPage from "./components/DocumentsPage.svelte";
</script>

<main>
  {#if $token}
    <DocumentsPage />
  {:else}
    <AuthPage />
  {/if}
</main>

<style>
  main {
    height: 500px;
    width: 350px;
  }
</style>
