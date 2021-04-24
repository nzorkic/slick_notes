<script>
<<<<<<< HEAD
  import { token } from "../shared/store";
=======
  import { token, documents } from "../shared/store";
>>>>>>> 0deac32 (test)
  import { getAllDocuments } from "../document-service";

  import DocumentTile from "./DocumentTile.svelte";

<<<<<<< HEAD
  $: documents = [];

  const getDocuments = async () => {
    var data = await getAllDocuments($token);
    documents = data?.files?.filter((file) => file.mimeType.endsWith("document"));
  };

  getDocuments();
</script>

<ul>
  {#each documents as { name, id }}
=======
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
>>>>>>> 0deac32 (test)
    <DocumentTile {name} {id} />
  {/each}
</ul>
