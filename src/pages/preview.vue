<style lang="scss" scoped>
.Preview {
  height: 100vh;
}
</style>
<script setup>
import { onMounted } from "vue";
import { useMeta2d } from "../hooks/useMeta2d";

onMounted(() => {
  const meta2d = useMeta2d("meta2d");
  const storage = localStorage.getItem("preview");
  const config = JSON.parse(storage);
  config.locked = 1;
  config.rule = false;
  meta2d.open(config);
  meta2d.fitView(true);
  meta2d.startAnimate();
  setTimeout(() => {
    meta2d.render();
  });
});
</script>

<template>
  <div id="meta2d" class="Preview"></div>
</template>
