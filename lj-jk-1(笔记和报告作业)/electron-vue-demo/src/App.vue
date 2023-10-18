<template>
  <div>
    <div class="area1" @contextmenu="showContextMenu1">第一个菜单区域</div>
    <div class="area2" @contextmenu="showContextMenu2">第二个菜单区域</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  // created 方法，将在加载页面时调用
  created() {
    // 监听全局鼠标右键
    // window.addEventListener('contextmenu', () => {
    //   console.log('contextmenu');
    // })
  },
  methods: {
    showContextMenu1(ev) {
      console.log('showContextMenu1');
      // ev: 事件对象，此处用于获取坐标
      // ev.pageX  ev.pageY  是鼠标点击的页面坐标
      console.log(ev);
      console.log(ev.pageX, ev.pageY);

      // 调用主进程
      electronAPI.showContextMenu(ev.pageX, ev.pageY)
    },
    showContextMenu2() {
      console.log('showContextMenu2');
    }
  }
}
</script>

<style>
.area1 {
  height: 200px;
  border: 10px solid #f00;
  box-sizing: content-box;
}

.area2 {
  height: 200px;
  border: 10px solid #ff0;
  box-sizing: content-box;
}
</style>
