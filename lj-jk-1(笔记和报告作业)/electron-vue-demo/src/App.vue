<template>
  <div>
    <h1>Hello Electron!!!</h1>
    <div>
      <!-- v-model 将输入框的值和 msg 属性进行绑定 -->
      <input v-model="msg" type="text">
      <button @click="send">发送消息给主进程</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: ''
    }
  },
  created() {
    window.receive = this.receive
  },
  methods: {
    send() {
      console.log('send');
      // 访问msg属性
      console.log(this.msg);
      // 渲染进程中调用 preload.js 中暴露出来的函数
      sendMessage(this.msg)
    },
    // 收到主进程的回复
    receive(replyTxt) {
      console.log('主进程的回复: ' + replyTxt);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
