<script>
  import { token } from "../shared/store";
  import { getAllDocuments } from "../document-service";

  import DocumentTile from "./DocumentTile.svelte";

  $: documents = [];

  const getDocuments = async () => {
    var data = await getAllDocuments($token);
    documents = data?.files?.filter((file) => file.mimeType.endsWith("document"));
  };

  getDocuments();
</script>

<ul>
  {#each documents as { name, id }}
    <DocumentTile {name} {id} />
  {/each}
</ul>
