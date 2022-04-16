# page-layout

### 盒子模型

宽

高

边框  大小， 线型  颜色

margin：逆时针 上

padding ：盒子与盒子元素之间的距离

height width指的是内容的。增加border

margin padding不会改变内容的尺寸，但是会增加元素框的总尺寸

 

### 首页制作

#### 首页制作分析

##### 商场类的导航。（css）

京东

![image-20220415200204184](https://raw.githubusercontent.com/HYHL0909/images/main/202204152002467.png)



![image-20220415200238070](https://raw.githubusercontent.com/HYHL0909/images/main/202204152002147.png)



###### 细节实现：

选中li 

- 上下有边框，而且有发光（box-shadow）的效果
- 右边的箭头会消失。（右边箭头用背景图片显示，将背景图片改成none）
- 会显示动态展示层
  - 外边框是灰色的，有发光效果
  - 外边框用div实现，就是margin-left是li的宽度。
  - z-index设置悬浮层展现顺序。
  - 悬浮层与li之间的线要消失
    - 实现的方式是写一个span，让它大一点去，z-index高一点去盖住那条线。
  - 使用dl dt dd 去实现，效果比较好。对搜索引擎比较好。
  - dd里a的线是将a变成block 然后设置边界线，至于间隔，padding解决 。

