<script lang="ts">
  import { token, files, active, documents } from "../shared/store";
  import { createParentsAndChildren } from "../services/document_service";

  import Folder from "./Folder.svelte";

  const getAllFiles = async () => {
    const structuredFiles = await createParentsAndChildren($token);
    files.set(structuredFiles);
  };

  if (!$files.length) {
    getAllFiles();
  }
</script>

<div class="header">
  <img alt="settings" src="images/icons/settings.svg" on:click={() => {}} />
  <img
    alt="refresh files"
    src="images/icons/refresh.svg"
    on:click={getAllFiles}
  />
</div>
<div class="tree-view">
  <Folder
    name="My Drive"
    items={[...$files]}
    activeFile={[...$documents].find((file) => file.id === $active)}
    expanded
  />
</div>
<div class="footer">
  <br />
</div>

<style>
  * {
    font-family: "Maven Pro", sans-serif;
  }
  .header {
    height: 10%;
  }

  .header img {
    cursor: pointer;
    width: 2.5em;
    height: 2.5em;
    float: right;
    margin: 0.8em 0.4em;
  }
  .tree-view {
    width: auto;
    padding: 1.4em 0 0 0.7em;
    height: 77%;
    border: 0.5px 0 rgb(126, 126, 126);
    line-height: 2.2em;
  }

  .footer {
    height: 13%;
  }
</style>
