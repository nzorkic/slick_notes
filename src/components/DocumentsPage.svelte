<script>
  import { token, documents } from "../shared/store";
  import { createParentsAndChildren } from "../services/document_service";

  import TreeView from "./TreeView.svelte";

  const getDocuments = async () => {
    const files = await createParentsAndChildren($token);
    console.log("files -> ", files);
    documents.set(files);
  };

  if (!$documents.length) {
    getDocuments();
  }
</script>

<button on:click={getDocuments}>Refresh</button>
<ul>
  {#each $documents as tree}
    <TreeView {tree} />
  {/each}
</ul>
