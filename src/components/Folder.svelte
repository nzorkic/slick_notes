<script lang="ts">
  import File from "./File.svelte";
  import type { File as FileType } from "../types/types";

  export let expanded: boolean;
  export let name: string;
  export let items: FileType[];
  export let activeFile: FileType;

  function toggle() {
    expanded = !expanded;
  }

  console.log("activeFile -> ", activeFile);
</script>

<span class:expanded on:click={toggle}>{name}</span>

{#if expanded}
  <ul>
    {#each items as item}
      <li>
        {#if item.type === "folder"}
          <svelte:self
            items={item.children}
            name={item.name}
            expanded={activeFile?.parents?.includes(item.id) ? true : false}
            {activeFile}
          />
        {:else}
          <File {...item} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  span {
    padding-left: 1.5em;
    background: url(/images/icons/folder-closed.svg) left no-repeat;
    background-size: 1.4em 1.4em;
    font-size: large;
    cursor: pointer;
  }

  .expanded {
    background-image: url(/images/icons/folder-open.svg);
  }

  ul {
    padding: 0.4em 0 0 0.5em;
    margin: 0 0 0 0.5em;
    list-style: none;
    border-left: 1px solid #eee;
  }

  li {
    padding: 0.2em 0;
  }
</style>
