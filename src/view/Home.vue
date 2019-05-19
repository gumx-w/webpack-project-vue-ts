<template>
  <div class="back-color">
    <input type="text" name="name" v-model="input">
    <div>
      {{input}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class Home extends Vue {
  input:string = "GUMX-1";
}

</script>

<style lang="scss">
div {
  background-color: red;
}
</style>

