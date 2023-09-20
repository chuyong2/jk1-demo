# electron+vue环境搭建

[参考文章](https://stricker.digital/posts/electron-with-vue-and-webpack/)

## 创建 vue 项目

```shell
# 安装 @vue/cli
npm i -g @vue/cli
```

```shell
# 创建项目
vue create <project-name>
```

## 添加 electron

```shell
# 添加 electron 模板
vue add electron-builder
```

## 项目结构

- `App.vue`: 主界面文件
- `background.js`: node.js 后台进程