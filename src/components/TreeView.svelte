<script context="module">
  const _expansionState = {};
</script>

<script>
  export let tree;
  const { name, children } = tree;

  let expanded = _expansionState[name] || false;
  const toggleExpansion = () => {
    expanded = _expansionState[name] = !expanded;
  };
  $: plusToX = expanded;
</script>

<ul>
  <li>
    {#if children != undefined && children.length}
      <span on:click={toggleExpansion}>
        <span class="plus" class:plusToX>&plus</span>
        {name}
      </span>
      {#if expanded}
        {#each children as child}
          <svelte:self tree={child} />
        {/each}
      {/if}
    {:else}
      <span>
        <span class="no-plus" />
        {name}
      </span>
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }
  .no-plus {
    padding-left: 1rem;
  }
  .plus {
    cursor: pointer;
    display: inline-block;
  }
  .plusToX {
    transform: rotate(45deg);
  }
</style>
