# QS

#### 简介

关于Vue中，序列化字符串，处理发送请求的参数

使用工具qs来处理参数

步骤：

#### 1、首先先下载：

npm i qs 

#### 2、然后引入 ：

import qs from 'qs'

#### 3、qs主要有两个方法 ：

方法一：将对象序列化，多个对象之间用&拼接（拼接是由底层处理，无需手动操作）

qs.stringify()	转换成查询字符串
let comments = {content: this.inputValue}
let comValue = qs.stringify(comments)
方法二：将序列化的内容拆分成一个个单一的对象

qs.parse() 转换成json对象

let comValue = qs.parse(comments)

