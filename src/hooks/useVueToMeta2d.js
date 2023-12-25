import { createApp } from "vue";
import { setElemPosition } from "@meta2d/core";

function setElementStyle(pen, el) {
  if (el) {
    setElemPosition(pen, el);
    const worldRect = pen.calculative.worldRect;
    const scale = window.meta2d.store.data.scale;
    el.style.width = `${(worldRect.width / scale).toFixed(6)}px`;
    el.style.height = `${(worldRect.height / scale).toFixed(6)}px`;
    el.style.transform += ` scale(${scale})`;
    el.style["transform-origin"] = "top left";
  }
}

export function useVueToMeta2d(_app) {
  function move(pen) {
    setElementStyle(pen, pen.calculative.singleton.div);
  }
  function destroy(pen) {
    if (pen.calculative.singleton) {
      const { div, app } = pen.calculative.singleton;
      app.unmount();
      div.remove();
    }
  }
  return function (pen) {
    if (!pen.onDestroy) {
      pen.onMove = move;
      pen.onRotate = move;
      // pen.onMouseEnter = move;
      pen.onDestroy = destroy;
    }

    if (!pen.calculative.singleton) {
      pen.calculative.singleton = {};
    }

    const path = new Path2D();
    if (!pen.calculative.singleton.div) {
      const div = document.createElement("div");
      const app = createApp(_app);
      pen.calculative.canvas.externalElements.parentElement.appendChild(div);
      pen.calculative.singleton.div = div;
      pen.calculative.singleton.app = app;
      setElementStyle(pen, div);
      app.mount(div);
    }

    return path;
  };
}
