<template>
  <div class="container">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="toolbar-btn">
          <span class="iconfont icon-caidan"></span>
        </div>
        <div>Standard</div>
        <div class="toolbar-btn">
          <span class="iconfont icon-suoxiao"></span>
        </div>
      </div>
      <div class="toolbar-btn">
        <span class="iconfont icon-lishi"></span>
      </div>
    </div>
    <!-- 显示屏 -->
    <div class="monitor">
      <input @contextmenu="showContextMenu" type="text" value="0">
    </div>
    <!-- 函数按钮行 -->
    <div class="functions">
      <div class="functions-btn">MC</div>
      <div class="functions-btn">MR</div>
      <div class="functions-btn">M+</div>
      <div class="functions-btn">M-</div>
      <div class="functions-btn">MS</div>
      <div class="functions-btn">M</div>
    </div>
    <!-- 按键区域 -->
    <div class="btns">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
    showContextMenu(ev) {
      // 获取坐标
      const point = {x: ev.pageX, y: ev.pageY}
      // 进程通信
      electronAPI.showContextMenu(point)
    }
  }
}
</script>

<style>
/* 引入图标库 */
@import '@/assets/iconfont.css';

body {
  margin: 0;
  background-color: #f3f3f3;
}

.container {
  /* vh: 视口高度的百分比 */
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 调试用边框 */
.debug-border {
  border: 5px solid #f00;
  box-sizing: content-box;
}

.toolbar {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.monitor {
  height: 68px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  font-size: 32px;
  font-weight: bolder;
}

.monitor>input {
  /* 去掉边框 */
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
}

.functions {
  display: flex;
}

.functions-btn {
  padding: 8px 10px;
  font-size: 12px;
}

.functions-btn:hover {
  background-color: #eaeaea;
  /* 圆角 */
  border-radius: 8px;
}

.btns {
  flex-grow: 1;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.btns>div {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  border: 2px solid #f0f0f0;
  border-radius: 4px;
}

.toolbar-btn {
  padding: 8px 12px;
}

/* :hover 鼠标悬停在该元素时 */
.toolbar-btn:hover {
  background-color: #eaeaea;
  /* 圆角 */
  border-radius: 8px;
}

.toolbar-left {
  display: flex;
  align-items: center;
}
</style>
