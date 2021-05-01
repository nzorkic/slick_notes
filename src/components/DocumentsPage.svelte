<script>
  import { token, documents } from "../shared/store";
  import { createParentsAndChildren } from "../services/document_service";

  import Folder from "./Folder.svelte";

  const getDocuments = async () => {
    const files = await createParentsAndChildren($token);
    documents.set(files);
  };

  if (!$documents.length) {
    getDocuments();
  }
</script>

<button on:click={getDocuments}>Refresh</button><br />
<Folder name="Home" items={[...$documents]} expanded />
