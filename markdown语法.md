# Markdown语法

## 标题
使用# + 空格可实现标题

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 代码文本和代码块

声明一个`stream`代码块

```java
public class TestStream{
    public void testStream{
        List<String> list = new ArrayList<>();
        Collections.addAll(list,"上海","苏州");
        list.stream().filter(cities -> cities.startWith("苏")).filter(cities -> cities.length() == 2).forEach(cities -> System.out.println(cities));
    }
}

```

## 文本编辑

这是一段文本

这是另一段文本

### 加粗

加粗前  **加粗后**

### 加斜

加斜前  *加斜后*

### 下划线

加下划线前 <u>加下划线后</u>

### 贯通线

加贯通线前  ~~加贯通线后~~

### 上角标

a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>

### 下角标

a<sub>1</sub> + b<sub>1</sub> = c<sub>1</sub>

## 有序列表和无序列表

`git`的特性有：

1. 不要钱
    1. dd
    2. 22
2. 方便
3. 好用

- 不要钱
    - dd
    - 22
- 方便
- 好用


## 表格

姓名 | 地址 
--- | ---
pdx | 静安区
kk  | 姑苏区
mm  | 卢湾区

## 代办列表

- [x] 列表项
- [ ] 列表项2

## 图片

![Test](./imgs/2023-09-11-08-42-49.png)

## 链接
### 外链

[Pinia中文文档](https://pinia.web3doc.top/)

### 文档内链

[跳转stream流代码块](#代码文本和代码块)

### 本地文件内链

[markdown文件.md](./lj-jk-1-master/计算机体系结构的基本概念/1/markdown文件.md)

## 引用

 > **shit** fuck

 ## 公式
 ```math
f(x) = x_{1} + x_{2} + ... + x_{n}
 ```

 ## html

 <div style="width: 100px; height: 100px; background-color: green;">
 <a href="https://www.bilibili.com/">hello</a>
 </div>
