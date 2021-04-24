<script>
  import { token, documents } from "../shared/store";
  import { getAllDocuments } from "../document-service";

  import DocumentTile from "./DocumentTile.svelte";

  const getDocuments = async () => {
    var data = await getAllDocuments($token);
    documents.set(
      data?.files?.filter((file) => file.mimeType.endsWith("document"))
    );
  };

  if (!$documents.length) {
    getDocuments();
  }
</script>

<button on:click={getDocuments}>Refresh</button>
<ul>
  {#each $documents as { name, id }}
    <DocumentTile {name} {id} />
  {/each}
</ul>
