<script setup>
import { onMounted } from "vue";
import Contextmenu from "./Contextmenu.vue";
import { useMeta2d } from "../hooks/useMeta2d";

import { useEventbus } from "../hooks/useEventbus";

const eventBus = useEventbus();

onMounted(async () => {
  useMeta2d("meta2d");
  eventBus.customEmit("load");
});
</script>

<template>
  <div id="meta2d"></div>
  <contextmenu></contextmenu>
</template>

<style scoped>
#meta2d {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #eee;
}
</style>
