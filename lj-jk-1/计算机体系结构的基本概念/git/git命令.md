# 大纲

## 配置个人信息

```shell script
git config --global user.name "xxxx"
git config --global user.email "xxxxx@qq.com"
```

## 创建仓库

- 本地创建

```shell script
git init
# 创建完成后将多出一个 .git 文件夹
# 拥有 .git 文件夹的文件夹就是一个 git 的本地仓库
```

- 远程仓库创建
- clone项目

```shell script
git clone url
```

## 添加

```shell script
git add path # 路径可以是文件也可以是文件夹
git add . # 添加仓库下所有文件
```

## 查看仓库状态

```shell script
git status
```

## 删除缓存

```shell script
git rm --cached <file>
```

> 该命令```<file>```参数不能是文件夹

也可以使用

```shell script
git reset path
```

> 该命令path参数可以是文件夹，也可以是文件，但该命令主要是用于重置当前版本状态

## 提交

```shell script
git commit -m msg
```

## 推

```shell script
git push
```

## 拉

```shell script
git pull origin <branchname>
```

## 切换版本

```shell script
git reset --hard HEAD~1
# --hard 放弃本地变更，强制切换版本
# HEAD~1 上一个版本，数字1可以改为任意数字，代表回滚到前几个版本
```

## 查看日志

```shell
git log
```

## 分支操作

### 查看分支

```shell script
git branch # 查看本地分支
git branch -a # 查看所有分支，包括远程分支
```

### 创建分支

```shell script
git branch branchName
```

创建后，需要push新的分支到远程

```shell script
git push --set-upstream origin <branchName>
```

### 切换分支

```shell script
git checkout <branchName>
```

### 融合分支

```shell script
git merge <branchName>
```

## 若本地和远程仓库不同步导致无法提交该怎么办

git 总是需要本地仓库包含远程仓库所有的内容 才能推送数据到远程仓库

若发现由于文件不同步导致无法推送时 可以考虑使用 reset 命令重置版本

> reset 命令执行前 最后备份下修改或新增的数据

```shell
# 执行命令 强制恢复版本到和服务器同步的状态
git reset --hard HEAD~1
```

# 疑难解答

## 重置git会话

有时要切换其他git账号提交项目，需要先重置git会话

```shell script
# 用管理员模式运行
git config --system --unset credential.helper
```

若依然 push 不成功，可以查看用户文件夹下是否存在 `.git-credentials` 该文件

该文件保存了用户的账号密码，删除该文件再试即可

## 保存登录凭证

```shell script
git config --global credential.helper store
```

## 设置代理

有时会遇到因为代理而无法连接git仓库的问题，例如：连接github时报错：

```shell script
fatal: unable to access '***': Failed to connect to github.com port 443 after 2096 ms: Connection refused
```

此时可以忽略 ssl 证书校验

```shell
git config --global http.sslVerify false
```

也可以设置git代理来解决

命令为：

```shell script
# 注意：该命令应该经过url编码
# userName 和 password 是代理的账号密码不是 git 仓库的
# 代理服务器不存在账号密码则不需要写
git config --global http.proxy http[s]://userName(encoded):password(encoded)@proxyaddress:port
```

## 子仓库命令

```shell
# 初始化子仓库
git submodule update --init --recursive
# 同步子仓库
git submodule update --remote
```