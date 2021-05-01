<script>
  import { active } from "../shared/store";
  export let name;
  export let type;
  export let id;

  let selected = $active;

  $: active.set(selected);
</script>

<span style="background-image: url(images/icons/{type}.svg)"
  >{name}
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
  {/if}</span
>

<style>
  span {
    padding: 0 0 0 1.5em;
    background: 0 0.1em no-repeat;
    background-size: 1em 1em;
  }
</style>
