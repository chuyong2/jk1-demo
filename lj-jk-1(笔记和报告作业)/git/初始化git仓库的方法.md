# 初始化git仓库的方法

## 什么是git仓库

git 用来存储数据的地方

git 仓库中会包含一个<b>隐藏文件夹</b> `.git`

git 的所有命令应该在 git 仓库文件夹下运行

## 初始化仓库

### 初始化远程仓库

通常在远程仓库服务器上，通过服务器提供的页面或接口来创建，例如: github 或 gitee 提供的创建仓库功能

### 初始化本地仓库

有两种方法

1. 使用 `git clone <url>` 命令来创建项目，其中，参数 url 是仓库地址
2. 使用 `git init` 命令初始化仓库
   - 想要初始化仓库，请确保已经执行过一次，以下命令
     ```shell
     git config --global user.name "<用户名>"
     git config --global user.email "<提交邮箱>"
     ``` 
   - `git init` 创建的仓库无法直接和远程仓库建立关联，所以需要手动关联
       - 流程如下：
         - `git init`
         - 在仓库中创建一个 `.gitkeep` 文件
         - `git add .`
         - `git commit -m "init"`
         - `git push`
         - `git remote add origin <url>` 添加要推送代码的远程仓库地址 url就是仓库地址
         - `git push --set-upstream origin master` 设置默认推送地址位 master 主枝
         - 执行完成后，以后的所有 `git push` 命令都可以不带参数执行了
