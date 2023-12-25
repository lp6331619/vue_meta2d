<template>
  <div>
    <div>test vue</div>
    {{ value }}
    <br />
    <input type="text" v-model="value" />
  </div>
</template>
<script setup>
import { ref } from "vue";
const value = ref("");
</script>
