<script setup>
import { computed, reactive, ref } from "vue";
import { eventType, eventBehavior } from "../../data/defaultsConfig.js";

const event = reactive({
  name: "",
  action: "",
  value: "",
});
let depList = computed(() => {
  return _eventBehavior.find((i) => i.behavior === event.action);
});
const _eventBehavior = reactive(eventBehavior);
function removeEvent() {
  const [activePen] = window.meta2d.store.active;
  activePen.events = [];
  event.name = "";
  event.action = "";
  event.value = "";
}
function confirmEvent() {
  const [activePen] = window.meta2d.store.active;
  let otherProps =
    depList.value.depend?.map((i) => {
      return {
        [i.bindProp]: i.bindData,
      };
    }) || [];
  const e = {
    name: event.name,
    action: event.action,
    ...otherProps,
  };
  Object.assign(e, ...otherProps);
  activePen.events = [e];
}
</script>

<template>
  <div class="event">
    <el-form @submit="(e) => e.preventDefault()">
      <el-form-item label="事件类型">
        <el-select v-model="event.name" placeholder="选择事件类型">
          <el-option
            v-for="e in eventType"
            :key="e.event"
            :label="e.name"
            :value="e.event"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!--        行为类型-->
      <el-form-item label="行为类型">
        <el-select v-model="event.action" placeholder="选择行为类型">
          <el-option
            v-for="i in eventBehavior"
            :key="i.behavior"
            :label="i.name"
            :value="i.behavior"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!--        事件类型依赖表单-->
      <el-form-item :label="dep.name" v-for="dep in depList?.depend">
        <el-input
          v-model="dep.bindData"
          :placeholder="dep.option?.placeholder || '请输入'"
          v-if="dep.type === 'input'"
          @[dep.event]="dep.func"
          :type="dep.option?.type || 'text'"
        />
        <!--          选择框-->
        <el-select
          v-model="dep.bindData"
          :placeholder="dep.option.placeholder"
          v-else-if="dep.type === 'select'"
        >
          <el-option
            v-for="item in dep.option.list"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <div class="event_button">
        <el-button
          @click="confirmEvent"
          type="primary"
          style="width: 100%; margin-right: 14px"
          >确认事件</el-button
        >
        <el-button
          @click="removeEvent"
          type="danger"
          style="width: 100%; margin-right: 14px"
          >清除事件</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.event_button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.event {
  margin: 10px;
}
</style>
