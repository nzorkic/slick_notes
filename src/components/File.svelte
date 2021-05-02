<script>
  import { active } from "../shared/store";
  export let name;
  export let type;
  export let id;

  window.onload = () => {
    if ($active) {
      document.querySelector(`.check-${$active}`).classList.add("show");
    }
  };

  const selectActive = (id) => {
    if (document.querySelector(`.check-${$active}`)) {
      document.querySelector(`.check-${$active}`).classList.remove("show");
    }
    document.querySelector(`.check-${id}`).classList.add("show");
    active.set(id);
  };
</script>

<div
  on:click={selectActive(id)}
  class="tile"
  style="background-image: url(images/icons/{type}.svg)"
>
  {name}
  <img class="check-{id}" alt="selected" src="/images/icons/checkmark.svg" />
</div>

<style>
  .tile {
    display: inline-block;
    vertical-align: middle;
    padding-left: 1.5em;
    background: left no-repeat;
    font-size: large;
    background-size: 1.4em 1.4em;
    height: 32px;
    width: 90%;
  }

  .tile:hover {
    cursor: pointer;
    background-color: rgb(231, 245, 255);
  }

  img {
    visibility: hidden;
    vertical-align: middle;
    height: 1em;
    width: 1em;
  }

  .show {
    visibility: visible;
  }
</style>
