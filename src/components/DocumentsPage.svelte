<script>
  import { token } from "../shared/store";
  import { getAllDocuments } from "../document-service";

  $: documents = [];

  const getDocuments = async () => {
    var data = await getAllDocuments($token);
    documents = data.files.filter((file) => file.mimeType.endsWith("document"));
  };

  getDocuments();
</script>

<ul>
  {#each documents as { name }, i}
    <li>{i + 1}: {name}</li>
  {/each}
</ul>
