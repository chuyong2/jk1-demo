# markdown语法

# 标题
## 标题
### 标题
#### 标题
##### 标题
###### 标题

## 代码文本和代码块

我声明一个 `java` 变量: `int i = 0;`

代码块如下:

```java
public class Car {
    public String name;
    public int price;
    Car(String name, int price) {
        this.name = name;
        this.price = price
    }
}
```

## 文本编辑

这是一段文本

这是另一端文本

**加粗** 加粗

*加斜* 加斜

<u>下划线</u> 下划线

~~贯通线~~ 贯通线

a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>

a<sub>1</sub> = b<sub>2</sub> + c<sub>3</sub>

## 有序列表和无需列表

`git` 的特性有:

有序列表:

1. 不要钱
2. 云端存储
   1. 2-1
   2. 2-2
      1. 2-2-1
      2. 2-2-2
   3. 2-3
3. 简单好用

无序列表如下:

- 1
- 2
  - 2-1
    - 2-1-1
    - 2-1-2
    - 2-1-3
  - 2-2
  - 2-3
- 3


## 表格

序号 | 姓名 | 性别 | 分数 
---  | ---  | --- | ---
1    | 张三  | 男   | 60
2    | 李四  | 女   | 90
3    | 老王  | 其他 | 70


## 待办列表

- [x] 列表项
- [ ] 新的列表项

1. [ ] 这是一个复选框
2. [ ] 这是另一个复选框

## 插入图片

放阔号内通常是提示文本

圆括号内通常是 url 资源链接

![情书](./1.png)

使用 paste image 插件:

快捷键: ctrl + alt + v 粘贴图片

![](md-img/markdown语法_2023-09-11_08-47-02.png)

## 插入链接

外部链接

[Electron ipcMain API](https://www.electronjs.org/zh/docs/latest/api/ipc-main)

当前文档内链接

[跳转到代码块和代码文本](#代码文本和代码块)

本地文件链接

[跳转到《markdown文件》](./markdown文件.md)

## 引用

引用他人的观点或文献资料

也可以用来添加提示信息

> **注意:** 请不要在涨水的季节下河游泳
> 这是无数鲜血与泪水换来的教训

## 数学公式

```math
E = mc^2
```

```math
sum = a_{1} + a_{2} + .... + a_{n}
```

```
E = mc^2
```

## 兼容大多数的 html 标签

<div style="width: 100px; height: 100px; background-color: #f00; color: #fff; font-weight: bolder;">hello html</div>

<img src="./1.png"/>

<a href="https://baidu.com">百度</a>