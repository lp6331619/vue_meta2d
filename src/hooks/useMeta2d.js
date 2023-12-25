import { Meta2d } from "@meta2d/core";
import { flowPens } from "@meta2d/flow-diagram";
import TestC from "../testC/index.vue";
import { useVueToMeta2d } from "./useVueToMeta2d";
import {
  activityDiagram,
  activityDiagramByCtx,
} from "@meta2d/activity-diagram";
import { sequencePens, sequencePensbyCtx } from "@meta2d/sequence-diagram";
import { classPens } from "@meta2d/class-diagram";
import { mindPens, mindAnchors } from "mind-diagram";
import { CollapseChildPlugin } from "mind-plugins-collapse";
import { toolBoxPlugin, butterfly } from "mind-plugins-core";
import {
  register as registerEcharts,
  registerHighcharts,
  registerLightningChart,
} from "@meta2d/chart-diagram"; // 引入echarts注册函数，原函数名为register 为了与其他注册函数区分这里重命名为registerEcharts
import { formPens } from "@meta2d/form-diagram";
export function useMeta2d(name) {
  // 创建meta2d对象
  const meta2d = new Meta2d(name);

  meta2d.setOptions({
    domShapes: ["TestC"],
  });

  meta2d.register(flowPens());

  // 注册注册活动图元
  meta2d.register(activityDiagram());
  // 原生canvas绘画的图库，支持逻辑复杂的需求
  meta2d.registerCanvasDraw(activityDiagramByCtx());

  // 注册时序图
  meta2d.register(sequencePens());
  meta2d.registerCanvasDraw(sequencePensbyCtx());

  // 注册类图
  meta2d.register(classPens());
  meta2d.register({ TestC: useVueToMeta2d(TestC) });
  meta2d.register(mindPens(toolBoxPlugin, CollapseChildPlugin));

  meta2d.registerAnchors(mindAnchors());
  // 注册表单图元
  meta2d.registerCanvasDraw(formPens());

  butterfly.MAXLENGTH = 8;
  // 直接调用Echarts的注册函数
  registerEcharts();

  // 直接调用HighCharts的注册函数
  registerHighcharts();
  // 直接调用LightningChart的注册函数
  registerLightningChart();

  return meta2d;
}
