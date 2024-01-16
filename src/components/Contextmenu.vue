<script setup>
import { computed, reactive, ref } from "vue";
import { useEventbus } from "../hooks/useEventbus.js";
let isPens = ref(false);
let ctxMenu = ref();
let activePens = [];
const isCombine = ref(false);
let menuPos = reactive({
  top: -9999,
  left: -9999,
  visible: false,
});

const calcMenuPos = computed(() => {
  return {
    top: menuPos.top + "px",
    left: menuPos.left + "px",
    visible: menuPos.visible ? "visible" : "hidden",
  };
});
const eventBus = useEventbus();
eventBus.customOn("load", () => {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    ctxMenu.value.focus();
  });
  meta2d.on("contextmenu", ({ e }) => {
    console.log(e, "contextmenu");
    menuPos.top = e.clientY;
    menuPos.left = e.clientX;
    menuPos.visible = true;
    ctxMenu.value.focus();
  });
  //点击选中的对象
  meta2d.on("active", (pens) => {
    console.log(pens, "active");
    if (pens.length > 0) {
      activePens = reactive(pens);
      isPens.value = true;
      isCombine.value = false;
      pens.length === 1 &&
        pens?.map((i) => {
          if (i.children?.length) {
            isCombine.value = true;
          }
        });
    } else {
      isPens.value = false;
      isCombine.value = false;
      activePens = [];
    }
  });
  meta2d.on("inactive", () => {
    isPens.value = false;
  });
});
// 删除
function deletePen() {
  const active = meta2d.store.active;
  meta2d.delete(active);
  ctxMenu.value.blur();
}
// 置顶
function changeCoverage(pos) {
  switch (pos) {
    case "top":
      meta2d.top(activePens);
      break;
    case "bottom":
      meta2d.bottom(activePens);
      break;
    case "up":
      meta2d.up(activePens);
      break;
    case "down":
      meta2d.down(activePens);
      break;
  }
  ctxMenu.value.blur();
}
// 锁定
function lock() {
  meta2d.lock(2);
  meta2d.emit("lock");
  ctxMenu.value.blur();
}
// 黏贴菜单
function paste() {
  meta2d.paste();
  ctxMenu.value.blur();
}
// 复制菜单
function copy() {
  meta2d.copy(activePens);
  ctxMenu.value.blur();
}
// 关闭菜单
function ctxMenuClose() {
  menuPos.visible = false;
}
//组合
const combine = () => {
  meta2d.combine(activePens);
  ctxMenu.value.blur();
};
//组合状态
const combineStatus = () => {
  meta2d.combine(activePens, 0);
  ctxMenu.value.blur();
};
//解组
const uncombine = () => {
  meta2d.uncombine(activePens[0]);
  ctxMenu.value.blur();
};
</script>

<template>
  <div class="contextmenu" ref="ctxMenu" tabindex="-1" @blur="ctxMenuClose">
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('top')">
      置顶
    </div>
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('bottom')">
      置底
    </div>
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('up')">
      上一图层
    </div>
    <div class="ctx_item" v-show="isPens" @click="changeCoverage('down')">
      下一图层
    </div>
    <div
      class="ctx_item borderT"
      v-show="activePens.length > 1"
      @click="combine"
    >
      组合
    </div>
    <div
      class="ctx_item borderT"
      v-show="activePens.length > 1"
      @click="combineStatus"
    >
      组合为状态
    </div>
    <div class="ctx_item" v-show="isCombine" @click="uncombine">取消组合</div>
    <div class="ctx_item borderT" @click="lock">锁定</div>
    <div class="ctx_item borderT" v-show="isPens" @click="copy">复制</div>
    <div class="ctx_item" v-show="isPens" @click="deletePen">删除</div>
    <div class="ctx_item" v-show="isPens" @click="paste">粘贴</div>
  </div>
</template>

<style scoped>
.contextmenu {
  padding: 6px;
  position: absolute;
  top: v-bind("calcMenuPos.top");
  left: v-bind("calcMenuPos.left");
  visibility: v-bind("calcMenuPos.visible");
  background-color: #fff;
  max-height: 5000px;
  width: 180px;
  z-index: 999;
  border-radius: 10px;
}
.ctx_item {
  width: 100%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}
.ctx_item:hover {
  background-color: #eeeeee;
}
.borderT {
  border-top: 1px solid #eee;
}
</style>
