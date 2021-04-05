<script>
  import { active } from "../shared/store";

  export var name;
  export var id;

  let selected = $active;

  $: active.set(selected);
</script>

<li>
  {name}
  {#if selected === id}
    <input
      type="radio"
      name="active"
      bind:group={selected}
      value={id}
      selected
    />
  {:else}
    <input type="radio" name="active" bind:group={selected} value={id} />
  {/if}
</li>
