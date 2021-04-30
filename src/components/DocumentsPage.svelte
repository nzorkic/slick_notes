<script>
  import { token, documents } from "../shared/store";
  import { getAllDocuments } from "../api/gdrive-api";

  import DocumentTile from "./DocumentTile.svelte";

  const getDocuments = async () => {
    var data = await getAllDocuments($token);
    console.log("data => ", data);
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
