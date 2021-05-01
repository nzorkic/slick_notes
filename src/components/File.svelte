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
    padding-left: 1.5em;
    background: left no-repeat;
    font-size: large;
    background-size: 1.4em 1.4em;
  }
</style>
